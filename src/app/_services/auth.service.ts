import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_modules/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwthelper = new JwtHelperService();
  decodedToken: any;
  currentuser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
        return this.http.post(this.baseUrl + 'login', model)
        .pipe(
          map((response: any) => {
            const user = response;
            if (user) {
              localStorage.setItem('token', user.token);
              localStorage.setItem('user', JSON.stringify(user.user));
              this.decodedToken = this.jwthelper.decodeToken(user.token);
              this.currentuser = user.user;
              this.changeMemberPhoto(this.currentuser.photoUrl);
            }
          })
        );
  }
register(user: User) {
        return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwthelper.isTokenExpired(token);
  }
}
