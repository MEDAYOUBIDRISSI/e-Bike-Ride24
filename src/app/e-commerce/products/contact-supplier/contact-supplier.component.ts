import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-supplier',
  templateUrl: './contact-supplier.component.html',
  styleUrls: ['./contact-supplier.component.css']
})
export class ContactSupplierComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ContactSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_vt22frc', 'template_05unfsm', e.target as HTMLFormElement, 'user_6BDcLxWaAYS5IaMc9pEA7')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.dialogRef.close("success")
      }, (error) => {
        console.log(error.text);
      });
  }

}
