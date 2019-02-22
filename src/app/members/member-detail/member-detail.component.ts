import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../_models/user';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { NgxGalleryAction, NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
User: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.User = data['user'];
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.User.photos.length; i++) {
      imageUrls.push({
        small: this.User.photos[i].url,
        medium: this.User.photos[i].url,
        big: this.User.photos[i].url,
        description: this.User.photos[i].description
      });
    }
    return imageUrls;
  }



}
