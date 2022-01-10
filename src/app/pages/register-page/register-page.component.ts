import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { UserDbService } from 'src/app/services/user-db/user-db.service';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  inputs: InputModel[] = [
    new InputModel("email", "Email", "email", "Enter email", true, false),
    new InputModel("password", "Password", "password", "Enter password", true, false),
    new InputModel("passwordRepeat", "Repeat password", "password", "Repeat password", true, false),
  ]

  checks: CheckButton[] = [
    new CheckButton("termsConditions", "I agree to the Terms & Conditions.", "checkbox", true, false),
    new CheckButton("emailNotifications", "Subscribe to our newsletter. (optional)", "checkbox", false, false)
  ]

  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl('', Validators.required),
      termsConditions: new FormControl('false', Validators.requiredTrue),
      emailNotifications: new FormControl('false')
    })
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    let password = this.registerForm.get("password")?.value
    let passwordRepeat = this.registerForm.get("passwordRepeat")?.value
    //let termsConditions = this.registerForm.get("termsConditions")
    //let emailNotifications = this.registerForm.get("emailNotifications")?.value

    if (!this.registerForm.get("email")?.valid) {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Invalid email.")
    } else {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(false)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("")
    }

    if (!this.registerForm.get("password")?.valid) {
      this.inputs[this.getIndexOfInputByName("password")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("password")].setInfoValue("Password must be at least 6 characters long.")
    } else {
      this.inputs[this.getIndexOfInputByName("password")].setErrorValue(false)
      this.inputs[this.getIndexOfInputByName("password")].setInfoValue("")
    }
    
    if (password !== passwordRepeat) {
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setInfoValue("Password does't match with the original one.")
    } else {
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setErrorValue(false)
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setInfoValue("")
    }

    if (this.inputs[this.getIndexOfInputByName("email")].getErrorValue() == false &&
        this.inputs[this.getIndexOfInputByName("password")].getErrorValue() == false &&
        this.inputs[this.getIndexOfInputByName("passwordRepeat")].getErrorValue() == false &&
        this.checks[this.getIndexOfCheckByName("termsConditions")].getErrorValue() == false) {  

          let user = {
            type: "user",
            username: "user",
            email: this.registerForm.get("email")?.value,
            movieList: [],
            avatar: "avatar",
            password: this.registerForm.get("password")?.value,
            favGenres: [],
            age: 0,
            sex: ""
          }

          this.registerUserDB(user)          
    }
  }

  // FIX THIS !!!!!!!!!!!!!!!!!
  registerUserDB(user: any): void {
    const url = "http://localhost:9000/user/register"
    this.http.post(url, user).subscribe(res => {
      if (Object.values(res)[0] == "Email already exists!") {
        this.inputs[this.getIndexOfInputByName("email")].setErrorValue(true)
        this.inputs[this.getIndexOfInputByName("email")].setInfoValue(Object.values(res)[0] || '')
      } else {
        window.sessionStorage.setItem("user-setup-email", user.email)
        this.router.navigate(["/setup"])
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

  getIndexOfCheckByName(name: string): number {
    let ind = -1
    this.checks.forEach((check, index) => {
      if (check.getNameValue() === name) {
        ind = index
      }
    })
    return ind
  }
}
