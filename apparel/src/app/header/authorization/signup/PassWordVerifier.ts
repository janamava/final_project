import { AbstractControl } from '@angular/forms';

export class PasswordVerifier {

  static PasswordValidator(abstractControl: AbstractControl) {

    const password = abstractControl.get('password').value;
    const matchingPassword = abstractControl.get('matchingPassword').value;

    const isPasswordEmpty = (password: string, matchingPassword: string): boolean => {
      const isEmpty = !password.length && !matchingPassword.length;

      return isEmpty;
    }

    if (password !== matchingPassword || (isPasswordEmpty(password, matchingPassword))) {
      abstractControl.get('matchingPassword').setErrors({ PasswordVerifier: true });
    }
  }

}