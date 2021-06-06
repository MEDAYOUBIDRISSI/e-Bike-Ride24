import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nave-bare',
  templateUrl: './nave-bare.component.html',
  styleUrls: ['./nave-bare.component.css']
})
export class NaveBareComponent implements OnInit {

  lang:any;
  isLoging:boolean=false;
  constructor(){}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    if(!localStorage.getItem("jwt-Token"))
    {
      this.isLoging=true;
    }
  }
  changeLang(lang:any)
  {
    localStorage.setItem("lang",lang.target.value);
    window.location.reload();
  }

  changeLanguageToEnglish()
  {
    localStorage.setItem("lang","en");
    window.location.reload();
  }
  changeLanguageToFrensh()
  {
    localStorage.setItem("lang","fr");
    window.location.reload();
  }

}
