import { getLocaleWeekEndRange } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'easeMytrip';
  constructor(){}
  ngOnInit(){
    localStorage.removeItem("journey");
    localStorage.removeItem("route");
    localStorage.removeItem("user")
  }
}
