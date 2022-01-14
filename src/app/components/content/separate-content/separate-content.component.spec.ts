import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateContentComponent } from './separate-content.component';

describe('SeparateContentComponent', () => {
  let component: SeparateContentComponent;
  let fixture: ComponentFixture<SeparateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparateContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
