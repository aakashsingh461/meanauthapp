import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authserve : AuthService, private route : Router) { }

    canActivate(){
        if(this.authserve.loggedIn()){
            return true;
        }else{
            this.route.navigate(['/']);
            return false;
        }
    }
}