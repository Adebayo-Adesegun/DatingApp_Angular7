import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_modules/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify:
    AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user  = data['user'];
    });
  }

  updateUser() {
    this.userService.updateuser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('profile update successfully');
      this.editForm.reset(this.user);
    }, error => {
        this.alertify.error(error);
    });

  }

}
