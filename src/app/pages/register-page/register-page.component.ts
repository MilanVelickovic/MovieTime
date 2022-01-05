import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckButton } from 'src/app/models/check-button/check-button';
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

  constructor(formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
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
    let email = this.registerForm.get("email")?.value
    let password = this.registerForm.get("password")?.value
    let passwordRepeat = this.registerForm.get("passwordRepeat")?.value
    let termsConditions = this.registerForm.get("termsConditions")
    let emailNotifications = this.registerForm.get("emailNotifications")?.value

    if (!this.registerForm.get("email")?.valid) {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("email")].setInfoValue("Invalid email.")
    } else {
      this.inputs[this.getIndexOfInputByName("email")].setErrorValue(false)
    }

    if (!this.registerForm.get("password")?.valid) {
      this.inputs[this.getIndexOfInputByName("password")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("password")].setInfoValue("Password must be at least 6 characters long.")
    } else {
      this.inputs[this.getIndexOfInputByName("password")].setErrorValue(false)
    }
    
    if (password !== passwordRepeat) {
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setErrorValue(true)
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setInfoValue("Password does't match with the original one.")
    } else {
      this.inputs[this.getIndexOfInputByName("passwordRepeat")].setErrorValue(false)
    }

    if (!this.registerForm.get("termsConditions")?.valid) {
      this.checks[this.getIndexOfCheckByName("termsConditions")].setErrorValue(true)
      console.log(termsConditions)
      console.log("t&c err")
    } else {     
      console.log("t&c fine")
    }

    if (this.inputs[this.getIndexOfInputByName("email")].getErrorValue() == true ||
        this.inputs[this.getIndexOfInputByName("password")].getErrorValue() == true ||
        this.inputs[this.getIndexOfInputByName("passwordRepeat")].getErrorValue() == true ||
        this.checks[this.getIndexOfCheckByName("termsConditions")].getErrorValue() == true) {
        console.log("Inputs do not fulfill the requirements!")
    } else {
        console.log("The form is valid!")
        // Don't forget to check id emailNotifications is checked
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
