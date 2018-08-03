import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;  
  loginCredData : any;  
  username: String;  
  password: String;
  finalJsonData;
 
  constructor(private authServe : AuthService, private route : Router) { }

  ngOnInit() {     
    this.setFormControl();   
  }

  setFormControl() {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(""),
        password : new FormControl("")
      }
    )
  }

  OnLogin(frmData){
    //console.log(JSON.stringify(frmData));
      let req = this.authServe.authenticateUser(JSON.stringify(frmData));        
          req.subscribe(resData => { 
            //console.log(JSON.stringify(resData));
            //console.log(JSON.parse(JSON.stringify(resData)));
            this.finalJsonData = JSON.parse(JSON.stringify(resData));            
            if(this.finalJsonData.success){
              this.authServe.storeUserData(this.finalJsonData.token, this.finalJsonData.user);
              console.log("Login Successfully !!! ");
              this.route.navigate(['/profile']);
            }else{
              this.route.navigate(['/login']);
              console.log("Invalid Credentials !!! Try again with correct username and password !!! ");
            }                      
          });
    this.OnDiscard();
  }

  OnDiscard(){    
    this.setFormControl();    
  }

}
