import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { CheckButton } from 'src/app/models/check-button/check-button';

@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class FormCheckComponent implements OnInit {

  @Input() check: CheckButton
  isChecked = false

  public parser = new DOMParser()

  constructor() {}

  ngOnInit(): void {
    window.sessionStorage.setItem(this.check.getNameValue(), this.isChecked.toString())
  }

  checked(event: any): void {
    this.isChecked = event.target.checked
    window.sessionStorage.setItem(this.check.getNameValue(), this.isChecked.toString())
  }

}
