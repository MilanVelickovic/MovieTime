import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (window.sessionStorage.getItem("user") || window.sessionStorage.getItem("user-setup-data")) {
      return true
    }
    this.router.navigate(["/login"])
    return false
  }

}
