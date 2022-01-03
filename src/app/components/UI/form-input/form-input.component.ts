import { Component, OnInit, Input } from '@angular/core';

import { Input as InputModel } from '../../../models/input/input';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() input: InputModel

  constructor() {

  }

  ngOnInit(): void {
  }

}

/**
 * <div class="form-group">
    <label for="{{name}}">{{name.charAt(0).toUpperCase() + name.slice(1)}}</label>
    <input type="{{type}}" class="form-control" id="{{name}}" placeholder="{{placeholder}}">
    <small id="{{name.concat('Help')}}" class="form-text text-muted">Requirements</small>
   </div>
 */