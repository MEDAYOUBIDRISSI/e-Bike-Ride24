import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImgZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
