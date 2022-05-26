import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { GeneralService } from 'src/app/service/general.service';
import { editorConfiguration } from '../dashboard.constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  toolbarConfig = editorConfiguration;
  bsConfig?: Partial<BsDatepickerConfig>;
  userId: any = null;
  userDetails = {
    fullName: '',
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
  constructor(
    private fb: FormBuilder,
    public render: Renderer2,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+(s[a-zA-Z]+)?$'),
        Validators.minLength(3),
      ]),
      age: new FormControl(null, Validators.required),
      workExp: this.fb.array([]),
    });
    this.userId = this.service.getLocalStorage('userId');
    this.addWorkExp();
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MMM-YYYY',
      }
    );
  }

  ngAfterViewInit() {
    var data = {
      userId: this.userId,
    };
    this.service.userDetails(data).subscribe((res: any) => {
      if (res.status === 201) {
        this.userDetails.fullName = res.body.user_details.fullName;
        this.personalDetailsForm.controls['fullName'].setValue(
          res.body.user_details.fullName
        );
      } else {
        console.log('User Not Found', res.status);
      }
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

  // Add new job experience fields
  addWorkExp() {
    const add = this.personalDetailsForm.get('workExp') as FormArray;
    add.push(
      this.fb.group({
        compLogo: new FormControl(null, Validators.required),
        companyName: new FormControl(null, Validators.required),
        jobTitle: new FormControl(null, Validators.required),
        startDate: new FormControl(null, Validators.required),
        endDate: new FormControl(null, Validators.required),
        currentJobCheck: new FormControl(false),
        jobDescription: new FormControl(null),
      })
    );
  }

  // Remove job experience field
  deleteWorkExp(index: number) {
    const remove = this.personalDetailsForm.get('workExp') as FormArray;
    remove.removeAt(index);
  }

  // Gets workExp form array controls
  get workEx(): FormArray {
    return this.personalDetailsForm.get('workExp') as FormArray;
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
      fullname: this.personalDetailsForm.controls['fullName'].value.trim(),
      // email_id: this.personalDetailsForm.controls['email_id'].value.trim(),
      age: (this.personalDetailsForm.controls['age'].value + '').trim(),
      file: '',
      workExp: this.personalDetailsForm.controls['workExp'].value,
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

  uploadImage(e: any, i: any, id: any) {
    const reader: any = new FileReader();
    let el = this.render.selectRootElement('#' + id + i, true);
    let file = e.target.files[0];
    this.personalDetailsForm.value.workExp[i].compLogo = file;
    reader.readAsDataURL(file);
    reader.onload = (_event: any) => {
      el.src = URL.createObjectURL(file);
    };
  }

  triggerImageupload(id: any, i: any) {
    let el = this.render.selectRootElement('#' + id + i, true);
    el.click();
  }

  removeImageupload(id: any, imgId: any, i: any) {
    let el = this.render.selectRootElement('#' + id + i, true);
    let el1 = this.render.selectRootElement('#' + imgId + i, true);
    el.value = null;
    el1.src = './assets/images/img_upload.png';
  }

  triggerDatePicker(id: any, i: any) {
    let el: any = this.render.selectRootElement('#' + id + i, true);
    el.click();
  }

  handleFileInput(e: any) {
    let fileToUpload = e.target.files.item(0);

    // this.updateDetailsAPI(fileToUpload);
  }
}
