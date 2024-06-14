import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token-storage/token.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private loginService: LoginService, private tokenService: TokenService, private formBuilder: FormBuilder, private route: Router) { }

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  token!: string;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      contactNumber: ['']
    });
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  };

  signup() {
    if(this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      alert("Incorrect Form Value");
      return;
    }
    this.loginService.signup(this.signupForm.value)
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          this.signupForm.reset();
          alert("You are successfully signed up!, Please Login Now.");
        } else {
          alert(res.statusMessage);
        }
      }
    })
  };

  login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert("Incorrect Form Value!");
      return;
    }
    this.loginService.login(this.loginForm.value)
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          this.token = res.data;
          this.tokenService.setToken(this.token);
          this.route.navigate(['/dashboard']);
        } else {
          alert(res.statusMessage);
        }
      }
    })
  };

  toggler() {
    let ref = document.getElementById('reg-log');
    ref?.click();
  };
}
