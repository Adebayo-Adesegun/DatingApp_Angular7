import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_modules/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
// child component of member edit component
    @Input() photos: Photo[];
  constructor() { }

  ngOnInit() {

  }

}
