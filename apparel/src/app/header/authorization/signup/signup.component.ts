import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';

import { PasswordVerifier } from './PassWordVerifier';
import { ItemForm } from '../.././../forms/ItemForm';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  private formGroup: FormGroup;
  private hidePassword: boolean = true;

  private isValidForm: boolean = false;
  private validPattern: string = '(?=.*\[0-9])(?=.*[a-z])(?=.*[A-Z]).*';
  private noSpacePattern: string = '[^ ]*';
  private noSpecialCharactersPattern: string = '[^-+_!@#$%^&*.,?]*';
  private passwordVerifier = PasswordVerifier.PasswordValidator;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SignupComponent>,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() { this.buildForm(); }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      userUuId: [''],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.noSpacePattern), Validators.pattern(this.validPattern)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.validPattern), Validators.pattern(this.noSpacePattern), Validators.pattern(this.noSpecialCharactersPattern)])],
      matchingPassword: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: [''],
      authority: ['user'],
      basket: [[]]
    }, { validators: this.passwordVerifier });

    this.formGroup
      .valueChanges
      .subscribe(() => this.isValidForm = this.formGroup.valid);

    this.formGroup
      .controls
      .password
      .valueChanges
      .subscribe(() =>
        this.formGroup.controls.matchingPassword.updateValueAndValidity());

  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.userService.addFormToBackEnd(this.formGroup.value).subscribe(res => {
        if (res.message === 'success') {
          this.notificationService.onSuccess('Your account was registered!');
        }
        else if (res.message === 'username is taken') {
          this.notificationService.onSuccess('This username is not available.')
        }
      });
      this.onClose();
    }
  }

  onClose() {
    this.dialogRef.close(this.formGroup.value);
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get matchingPassword() {
    return this.formGroup.get('matchingPassword');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get address() {
    return this.formGroup.get('address');
  }

  noSpace(inputValue: string) {
    const regularExpression = /\s/g;

    return regularExpression.test(inputValue);
  }

  isLowerCased(inputValue: string) {
    const regularExpression = /[a-z]/;

    return regularExpression.test(inputValue);
  }

  isUpperCased(inputValue: string) {
    const regularExpression = /[A-Z]/;

    return regularExpression.test(inputValue);
  }

  hasANumber(inputValue: string) {
    const regularExpression = /[0-9]/;

    return regularExpression.test(inputValue);
  }

  noSpecialCharacters(inputValue: string) {
    const regularExpression = /[!@#$%^&*(),.?":{}|<>]/;

    return regularExpression.test(inputValue);
  }

}
