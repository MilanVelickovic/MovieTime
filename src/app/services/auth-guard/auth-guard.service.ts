import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService1 implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (window.sessionStorage.getItem("user") || window.sessionStorage.getItem("user-setup-email")) {
      return true
    }
    this.router.navigate(["/login"])
    return false
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService2 implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (window.sessionStorage.getItem("user")) {
      this.router.navigate(["/home"])
      return false
    }
    return true
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService3 implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user") || '')
      if (user.type == "admin") {
        return true
      } else {
        this.router.navigate(["/home"])
        return false
      }
    }
    this.router.navigate(["/login"])
    return false
  }

}

