import { Component, OnInit } from '@angular/core';

import { CheckButton } from 'src/app/models/check-button/check-button';
import { Input as InputModel } from '../../models/input/input';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public inputs: InputModel[] = [
    new InputModel("email", "Email", "email", "Enter email", "Requirements"),
    new InputModel("password", "Password", "password", "Enter password", "Requirements")
  ]

  public check: CheckButton = new CheckButton("rememberMe", `Remember me.`, "checkbox", "")

  constructor() { }

  ngOnInit(): void {
  }

}
