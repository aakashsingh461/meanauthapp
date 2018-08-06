import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { tokenNotExpired } from 'angular2-jwt';  // must install angular2-jwt and rxjs-compat for upgraded version


@Injectable()
export class AuthService {
  
  authToken : any;
  user : any;

  constructor(private http : HttpClient) { }

  //Add User
  addUser(newUser){
    //console.log(newUser);
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //return this.http.post('http://localhost:3000/users/register',newUser,{headers});
    return this.http.post('users/register',newUser,{headers}); // use this for app deployment to heroku
  }

  // authenticate User
  authenticateUser(cred){
    //console.log(cred);
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //return this.http.post('http://localhost:3000/users/authenticate',cred,{headers});     
    return this.http.post('users/authenticate',cred,{headers});   // use this for app deployment to heroku 
  }

  // get Profile
  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders(
    {'Content-Type':'application/json',
    'Authorization':this.authToken});
    //return this.http.get('http://localhost:3000/users/profile',{headers});
    return this.http.get('users/profile',{headers});  // use this for app deployment to heroku 
  }

  // load Token
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn

  loggedIn(){    
    return tokenNotExpired('id_token');
  }

  // storeUserData - work like maintaing session on login
  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // logout

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

// error of map function is not resolved but we can use these libraries
//import { map } from 'rxjs/operators';
// import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/Rx';