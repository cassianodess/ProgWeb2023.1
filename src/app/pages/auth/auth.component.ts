import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public email: FormControl = new FormControl("", [Validators.email, Validators.required]);
  public emailSignUp: FormControl = new FormControl("", [Validators.email, Validators.required]);
  public password: FormControl = new FormControl("", [Validators.required, Validators.nullValidator]);
  public passwordSignUp: FormControl = new FormControl("", [Validators.required, Validators.nullValidator]);
  public passwordConfirm: FormControl = new FormControl("", [Validators.required, Validators.nullValidator]);
  public hide: boolean = true;
  public hideSignUp: boolean = true;
  public hideSignUpConfirm: boolean = true;
  public isLoading: boolean = false;

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: AuthService) { }

  public openSnackBar(message: string, fail: boolean) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  public isEmailValid(): boolean {
    return this.email.hasError('email') && !this.email.hasError('required');
  }

  public hasEmailError() {
    return this.email.hasError('required');
  }

  public isSignUpValid(): boolean {
    return this.emailSignUp.valid && this.passwordSignUp.valid && this.passwordConfirm.valid && (this.passwordSignUp.value == this.passwordConfirm.value);
  }

  public isSignInValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  public onLogin() {
    this.service.signIn(this.email.value, this.password.value).subscribe({
      next: (user) => {
        this.router.navigate(["/home", user.id]);
      },
      error: (err) => {
        this.openSnackBar(err.error.message, true)
      }
    });
  }

  public onSignUp() {
    this.isLoading = true;
    let user: User = {
      email: this.emailSignUp.value,
      password: this.passwordSignUp.value
    };

    this.service.signUp(user).subscribe({
      next: (user) => {
        this.openSnackBar("Verifique seu e-mail para fazer a verificação", false);
        this.emailSignUp.setValue("");
        this.emailSignUp.markAsUntouched();
        this.passwordSignUp.setValue("");
        this.passwordSignUp.markAsUntouched();
        this.passwordConfirm.setValue("");
        this.passwordConfirm.markAsUntouched();

        (document.querySelector("div[role='tab']") as HTMLDivElement).click();
      },
      error: (err) => {
        this.openSnackBar(err.error.message, true);
      },
      complete: () => {
      }
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 500);


  }

}
