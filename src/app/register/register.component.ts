import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;
  registered: boolean = false;
  notRegistered: boolean = false;
  constructor(private router: Router, private service: GeneralService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  registerUser() {
    var fullName = this.signUpForm.controls['fullName'].value.trim();
    var firstName = fullName.split(' ').slice(0, -1).join(' ');
    var lastName = fullName.split(' ').slice(-1).join(' ');
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: this.signUpForm.controls['email'].value.trim(),
      userName: this.signUpForm.controls['email'].value.trim(),
      password: this.signUpForm.controls['password'].value.trim(),
    };
    this.registered = true;
    // this.service.register(data).subscribe(
    //   (res: any) => {
    //     this.registered = true;
    //     this.notRegistered = false;
    //   },
    //   (err) => {
    //     console.log('Failed to register user!', err);
    //     this.registered = false;
    //     this.notRegistered = true;
    //   }
    // );
  }

  navigateTo() {
    this.router.navigate(['/login']);
  }
}
