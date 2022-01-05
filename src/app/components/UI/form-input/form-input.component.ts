import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

import { Input as InputModel } from '../../../models/input/input';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class FormInputComponent implements OnInit {

  @Input() input: InputModel

  constructor() { }

  ngOnInit(): void {
  }

  toErrorMessage(name: string): string {
    return name.concat("Error")
  }

}