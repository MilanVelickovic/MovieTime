import { Component, OnInit } from '@angular/core';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public inputs: InputModel[] = [
    new InputModel("username", "Username", "text", "Enter username", "Requirements"),
    new InputModel("email", "Email", "email", "Enter email", "Requirements"),
    new InputModel("password", "Password", "password", "Enter password", "Requirements"),
    new InputModel("passwordRe", "Repeat password", "password", "Repeat password", "Requirements"),
  ]

  public checks: CheckButton[] = [
    new CheckButton("termsConditions", `By clicking  you agree to accept our Terms & Conditions.`, "checkbox", "Requirements"),
    new CheckButton("emailNotifications", `Subscribe to our newsletter.`, "checkbox", "Requirements")
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
