import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignupRequest } from '../dto/signup.request';
import * as AuthActions from '../store/auth.actions';
import {
  selectAuthenticating,
  selectAuthErrors,
} from '../store/auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  isSigningUp$: Observable<boolean>;
  errors$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearErrors());

    this.isSigningUp$ = this.store.pipe(select(selectAuthenticating));
    this.errors$ = this.store.pipe(select(selectAuthErrors));

    this.initForm();
  }

  onSubmit(): void {
    const name = this.signupForm.value.name;
    const emailAddress = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    const request: SignupRequest = {
      name,
      emailAddress,
      password,
    };

    this.store.dispatch(AuthActions.signupStart({ signupRequest: request }));
  }

  private initForm(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
