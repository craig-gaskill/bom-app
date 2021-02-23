import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../shared/material.module';
import {BomInputModule} from '../../shared/components/input/bom-input.module';
import {BomEmailModule} from '../../shared/components/email/bom-email.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        BomEmailModule,
        BomInputModule,
        MaterialModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        RegisterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
