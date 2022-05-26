import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: GeneralService) {}
  loginForm!: FormGroup;
  invalidUser: boolean = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    var data = {
      email: this.loginForm.controls['email'].value.trim(),
      password: this.loginForm.controls['password'].value,
    };
    this.service.login(data).subscribe(
      (res: any) => {
        if (res.status === 201) {
          this.invalidUser = false;
          this.router.navigate(['/dashboard']);
          this.service.setLocalStorage('userId', res.body ['userId']);
        } else {
          console.log('User Not Found', res.status);
          this.invalidUser = true;
        }
      },
      (err) => {
        console.log('Login error', err);
        this.invalidUser = true;
      }
    );
  }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
