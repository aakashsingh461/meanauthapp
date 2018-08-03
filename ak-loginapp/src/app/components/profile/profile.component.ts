import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : Object;
  constructor(private authServe : AuthService, private route : Router) { }

  ngOnInit() {
    
    let req = this.authServe.getProfile();        
    req.subscribe(resData => {    
        console.log(JSON.parse(JSON.stringify(resData)).user);
        this.user = JSON.parse(JSON.stringify(resData)).user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
