import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public inputs: InputModel[] = [
    new InputModel("email", "Email", "email", "Enter email", true, false),
    new InputModel("password", "Password", "password", "Enter password", true, false)
  ]

  check: CheckButton = new CheckButton("rememberMe", `Remember me.`, "checkbox", false, false)

  loginForm: FormGroup
  rememberMeValue: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(this.rememberMeValue, )
    })
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    let email = this.loginForm.get("email")?.value
    let password = this.loginForm.get("password")?.value
    let rememberMe = this.loginForm.get("rememberMe")
    console.log(rememberMe)

    if (!this.loginForm.get("email")?.valid) {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Invalid email.")
    } else {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(false)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("")
    }

    if (this.inputs[this.getIndexOfInputByName("email")].getErrorValue() == false &&
        this.inputs[this.getIndexOfInputByName("password")].getErrorValue() == false) {
          // TEST TEST ---------------------------------------------------
          // This is just a simulation -----------------------------------
          // -------------------------------------------------------------
          let user = {
            type: "admin",
            username: "admin",
            email: "admin@yahoo.com",
            movieList: [],
            avatar: "avatar2"
          }
          let userPass = "123"
          window.sessionStorage.setItem("user", JSON.stringify(user))
          if (email === user.email) {
            if (password === userPass) {
              if (this.rememberMeValue) {
                this.setCookie("email@movie-time", email)
                this.setCookie("password@movie-time", password)
              }
              this.router.navigate(["/home"])
            } else {
              this.inputs[this.getIndexOfInputByName("password")].setInfoValue("Incorrect password! Please try again.")
            }
          } else {
            this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Email address not found!")
          }
          
          // END ---------------------------------------------------------
          // -------------------------------------------------------------
    }
  }

  getIndexOfInputByName(name: string): number {
    let ind = -1
    this.inputs.forEach((input, index) => {
      if (input.getNameValue() === name) {
        ind = index
      }
    })
    return ind
  }

  rememberMe(): void {
    this.rememberMeValue = !this.rememberMeValue
  }

  setCookie(cname: string, cvalue: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (60 * 60 * 24));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}
