import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { UserDbService } from 'src/app/services/user-db/user-db.service';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public inputs: InputModel[] = [
    new InputModel("email", "Email", "email", "Enter email", true),
    new InputModel("password", "Password", "password", "Enter password", true)
  ]

  check: CheckButton = new CheckButton("rememberMe", `Remember me.`, "checkbox", false, false)

  loginForm: FormGroup
  rememberMeValue: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private userDB: UserDbService) {
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

    if (!this.loginForm.get("email")?.valid) {
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Invalid email.")
    } else {
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("")
    }

    this.inputs[this.getIndexOfInputByName("password")].setInfoValue("")
    if (this.inputs[this.getIndexOfInputByName("email")].getInfoValue() == "" &&
        this.inputs[this.getIndexOfInputByName("password")].getInfoValue() == "") {
          let user = {
            email: email,
            password: password
          }

          this.loginUserDB(user)   
    }
  }

  loginUserDB(user: any) {
    const url = "http://localhost:9000/user/login"
    this.http.post(url, user).subscribe(res => {
      if (Object.values(res)[0] == "Email not found!") {
        this.inputs[this.getIndexOfInputByName("email")].setInfoValue(Object.values(res)[0])
      } else if (Object.values(res)[0] == "Password incorrect!") {
        this.inputs[this.getIndexOfInputByName("password")].setInfoValue(Object.values(res)[0])
      } else {
        window.sessionStorage.setItem("user", JSON.stringify(Object.values(res)[1]))
        this.router.navigate(["/home"])
      }
    })
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
