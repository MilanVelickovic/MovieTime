import { Component, Input, OnInit } from '@angular/core';
import { CheckButton } from 'src/app/models/check-button/check-button';

@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.scss']
})
export class FormCheckComponent implements OnInit {

  @Input() check: CheckButton

  public parser = new DOMParser()

  constructor() { }

  ngOnInit(): void {
  }

}
