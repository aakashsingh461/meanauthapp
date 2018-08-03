import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  signUpForm;
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private authServe : AuthService, private route : Router) { }

  ngOnInit() {     
    this.setFormControl();   
  }

  setFormControl() {
    this.signUpForm = new FormGroup(
      {
        name: new FormControl(""),
        email: new FormControl(""),
        username: new FormControl(""),
        password : new FormControl("")
      }
    )
  }

  OnsignUp(frmData){
    //console.log(frmData);
    let req = this.authServe.addUser(frmData);
      req.subscribe(Response=> {
          console.log("User Registration Successfully !!!");   
          this.route.navigate(['/login']);
          this.OnDiscard();
      })
  }

  OnDiscard(){    
    this.setFormControl();    
  }

}
