import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-print-commande',
  templateUrl: './print-commande.component.html',
  styleUrls: ['./print-commande.component.css']
})
export class PrintCommandeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrintCommandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  printPage() {
    window.print();
  }
  
}
