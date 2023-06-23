import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public email: FormControl = new FormControl("", Validators.email);
  public password: FormControl = new FormControl("");
  public passwordConfirm: FormControl = new FormControl("");
  public hide: boolean = true;
  public hideSignUp: boolean = true;
  public hideSignUpConfirm: boolean = true;

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  public openSnackBar(message: string, fail: boolean) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 10000,
    });
  }

  public isEmailValid(): boolean {
    return this.email.hasError('email') && !this.email.hasError('required');
  }

  public hasEmailError() {
    return this.email.hasError('required');
  }

  public onLogin() {
    this.router.navigate([""]);
    this.openSnackBar("LOGADO", false);
  }

  public onSignUp() {
    this.openSnackBar("Verifique seu email", false);

  }

}
