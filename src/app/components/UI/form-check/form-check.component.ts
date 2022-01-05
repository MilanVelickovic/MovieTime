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

  public parser = new DOMParser()

  constructor() {}

  ngOnInit(): void {
  }

}
