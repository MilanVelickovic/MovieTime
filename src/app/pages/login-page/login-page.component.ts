import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  inputs: InputModel[] = [
    new InputModel("email", "Email", "email", "Enter email", true, false),
    new InputModel("password", "Password", "password", "Enter password", true, false)
  ]

  check: CheckButton = new CheckButton("rememberMe", `Remember me.`, "checkbox", false, false)

  loginForm: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl('', )
    })
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    let email = this.loginForm.get("email")?.value
    let password = this.loginForm.get("password")?.value
    let rememberMe = this.loginForm.get("rememberMe")?.touched

    if (!this.loginForm.get("email")?.valid) {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Invalid email.")
    } else {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(false)
    }

    if (this.inputs[this.getIndexOfInputByName("email")].getErrorValue() == true ||
        this.inputs[this.getIndexOfInputByName("password")].getErrorValue() == true) {
        console.log("Inputs do not fulfill the requirements!")
    } else {
        console.log("The form is valid!")
        // Don't forget to check if rememberMe is checked
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

}
