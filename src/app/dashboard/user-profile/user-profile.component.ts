import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { editorConfiguration } from '../dashboard.constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  toolbarConfig = editorConfiguration;
  userDetails = {
    fullname: '',
    age: '',
    profile_picture: 'assets/images/profile/ic_userdefault.svg',
  };
  personalDetailsForm!: FormGroup;
  enableUpdateBtn: boolean = false;
  enableEdit: boolean = false;
  successImg: any = '';
  successHeading: any = '';
  successSubHeading: any = '';
  btnName: any = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      fullname: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+(s[a-zA-Z]+)?$'),
        Validators.minLength(3),
      ]),
      age: new FormControl(null, Validators.required),
      email_id: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      workExp: this.fb.array([]),
    });
  }

  editField() {
    this.enableEdit = !this.enableEdit;
    this.personalDetailsForm.setErrors({ invalid: true });
  }

  validateAge() {
    if (
      parseInt(this.personalDetailsForm.controls['age'].value) < 18 ||
      this.personalDetailsForm.controls['age'].value == ''
    ) {
      this.personalDetailsForm.controls['age'].setErrors({ invalid: true });
    } else {
      this.personalDetailsForm.controls['age'].setErrors(null);
    }
  }

  updateDetails() {
    if (
      parseInt(this.personalDetailsForm.controls['age'].value) < 18 ||
      this.personalDetailsForm.controls['age'].value == ''
    ) {
      this.personalDetailsForm.controls['age'].setErrors({ invalid: true });
    } else {
      this.personalDetailsForm.controls['age'].setErrors(null);
      this.updateDetailsAPI(null);
    }
  }

  cancelEdit() {
    this.enableEdit = false;
    // const userDetails = this.service
    //   .getUserDetails(userId)
    //   .pipe(timeout(15000))
    //   .subscribe(
    //     (res) => {
    //       this.afterGetUserDetails(res);
    //     },
    //     (error) => {
    //       if (error.name === 'TimeoutError') {
    //         this.timeout();
    //       } else {
    //         this.afterGetUserDetails(error.error.text);
    //       }
    //     }
    //   );
    // setTimeout(() => {
    //   userDetails.unsubscribe();
    // }, 15000);
  }

  updateDetailsAPI(file: any) {
    let dataParam = {
      fullname: this.personalDetailsForm.controls['fullname'].value.trim(),
      email_id: this.personalDetailsForm.controls['email_id'].value.trim(),
      age: (this.personalDetailsForm.controls['age'].value + '').trim(),
      file: '',
    };
    if (file) {
      dataParam.file = file;
    }
    console.log('Personal Details', dataParam);
    // const updateProfile = this.service
    //   .updateProfile(dataParam)
    //   .pipe(timeout(15000))
    //   .subscribe(
    //     (res) => {
    //       this.afterUserProfileUpdate(res);
    //     },
    //     (error) => {
    //       if (error.name === 'TimeoutError') {
    //         this.timeout();
    //       } else {
    //         this.afterUserProfileUpdate(error.error.text);
    //       }
    //     }
    //   );
    // setTimeout(() => {
    //   updateProfile.unsubscribe();
    // }, 15000);
  }

  triggerDatePicker() {
    
  }

  handleFileInput(e: any) {
    let fileToUpload = e.target.files.item(0);

    // this.updateDetailsAPI(fileToUpload);
  }
}
