import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { timeout } from 'rxjs';
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
  profilePicture: any = 'assets/images/profile/ic_userdefault.svg';
  personalDetailsForm!: FormGroup;
  enableUpdateBtn: boolean = false;
  enableEdit: boolean = false;
  successImg: any = '';
  successHeading: any = '';
  successSubHeading: any = '';
  btnName: any = '';
  profilePicFile: any;
  constructor(
    private fb: FormBuilder,
    public render: Renderer2,
    private service: GeneralService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userId = this.service.getLocalStorage('userId');
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MMM-YYYY',
      }
    );
    this.getWorkExp();
  }

  getWorkExp() {
    var data = {
      userId: this.userId,
    };
    this.service.userDetails(data).subscribe((res: any) => {
      this.userDetails.fullName = res.body.fullName;
      this.userDetails.age = res.body.age;
      if (res.body.work_exp.length > 0) {
        this.personalDetailsForm = new FormGroup({
          fullName: new FormControl(res.body.fullName, [
            Validators.required,
            Validators.pattern('^[a-zA-Z ]+(s[a-zA-Z]+)?$'),
            Validators.minLength(3),
          ]),
          age: new FormControl(res.body.age),
          work_exp: this.fb.array(
            res.body.work_exp.map((exp: any) =>
              this.fb.group({
                comp_logo: new FormControl(exp['comp_logo']),
                company_name: new FormControl(
                  exp['company_name'],
                  Validators.required
                ),
                job_title: new FormControl(
                  exp['job_title'],
                  Validators.required
                ),
                start_date: new FormControl(
                  new Date(exp['start_date']),
                  Validators.required
                ),
                end_date: new FormControl(new Date(exp['end_date'])),
                current_job: new FormControl(exp['current_job'], [Validators.required]),
                job_desc: new FormControl(exp['job_desc']),
              })
            )
          ),
        });
        setTimeout(() => {
          res.body.work_exp.forEach((item: any, i: any) => {
            let el: any = document.getElementById('compImgVal' + i);
            console.log(el);
            el.src = item.comp_logo;
          });
        }, 1000);
      } else {
        this.personalDetailsForm = new FormGroup({
          fullName: new FormControl(null, [
            Validators.required,
            Validators.pattern('^[a-zA-Z ]+(s[a-zA-Z]+)?$'),
            Validators.minLength(3),
          ]),
          age: new FormControl(null),
          work_exp: this.fb.array([]),
        });
      }
    });
  }

  generateWorkExpForm(data: any) {
    return this.fb.group({
      company_name: this.fb.control(
        {
          value: data.company_name,
          disabled: false,
        },
        Validators.required
      ),
      current_job: this.fb.control({
        value: data.current_job,
        disabled: false,
      }),
      end_date: this.fb.control({
        value: new Date(data.end_date),
        disabled: false,
      }),
      start_date: this.fb.control(
        {
          value: new Date(data.start_date),
          disabled: false,
        },
        Validators.required
      ),
      job_title: this.fb.control(
        {
          value: data.job_title,
          disabled: false,
        },
        Validators.required
      ),
      job_desc: this.fb.control(
        {
          value: data.job_desc,
          disabled: false,
        },
        Validators.required
      ),
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
  addWorkExp(data: any) {
    const add = this.personalDetailsForm.get('work_exp') as FormArray;
    add.push(
      this.fb.group({
        comp_logo: new FormControl(null),
        company_name: new FormControl(null, Validators.required),
        job_title: new FormControl(null, Validators.required),
        start_date: new FormControl(null, Validators.required),
        end_date: new FormControl(null, Validators.required),
        current_job: new FormControl(null),
        job_desc: new FormControl(null),
      })
    );
    console.log(data);
    // if (data.length) {
    //   add.push(
    //     this.fb.group({
    //       comp_logo: new FormControl(data.company_logo, Validators.required),
    //       company_name: new FormControl(data.company_name, Validators.required),
    //       job_title: new FormControl(data.job_title, Validators.required),
    //       start_date: new FormControl(data.start_date, Validators.required),
    //       end_date: new FormControl(data.end_date, Validators.required),
    //       current_job: new FormControl(data.current_job),
    //       job_desc: new FormControl(data.company_logo),
    //     })
    //   );
    // } else {
    //   add.push(
    //     this.fb.group({
    //       comp_logo: new FormControl(null, Validators.required),
    //       company_name: new FormControl(null, Validators.required),
    //       job_title: new FormControl(null, Validators.required),
    //       start_date: new FormControl(null, Validators.required),
    //       end_date: new FormControl(null, Validators.required),
    //       current_job: new FormControl(false),
    //       job_desc: new FormControl(null),
    //     })
    //   );
    // }
  }

  // Remove job experience field
  deleteWorkExp(index: number) {
    const remove = this.personalDetailsForm.get('work_exp') as FormArray;
    remove.removeAt(index);
  }

  // Gets workExp form array controls
  get workEx(): FormArray {
    return this.personalDetailsForm.get('work_exp') as FormArray;
  }

  currentJobSet(e: any, i: any) {}

  compareTwoDates() {
    if (
      new Date(this.personalDetailsForm.controls['start_date'].value) <
      new Date(this.personalDetailsForm.controls['end_date'].value)
    ) {
      return false;
      //  this.error={isError:true,errorMessage:'End Date can't before start date'};
    } else {
      return true;
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
      userId: this.userId,
      fullname: this.personalDetailsForm.controls['fullName'].value.trim(),
      // email_id: this.personalDetailsForm.controls['email_id'].value.trim(),
      age: (this.personalDetailsForm.controls['age'].value + '').trim(),
      file: '',
      workExp: this.personalDetailsForm.controls['work_exp'].value,
    };
    if (file) {
      dataParam.file = file;
    }
    console.log('Personal Details', dataParam);
    const updateProfile = this.service
      .updateUserDetails(dataParam)
      .pipe(timeout(15000))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    setTimeout(() => {
      updateProfile.unsubscribe();
    }, 15000);
  }

  uploadCompanyLogo(e: any, i: any, id: any) {
    const reader: any = new FileReader();
    let el = this.render.selectRootElement('#' + id + i, true);
    let file = e.target.files[0];
    // this.personalDetailsForm.value.workExp[i].compLogo = file;
    reader.readAsDataURL(file);
    var self = this;
    reader.onload = (_event: any) => {
      el.src = URL.createObjectURL(file);
      this.personalDetailsForm.value.work_exp[i].comp_logo =
        URL.createObjectURL(file);
    };
  }

  handleFileInput(e: any) {
    const reader: any = new FileReader();
    let file = e.target.files[0];
    var self = this;
    reader.onload = (_event: any) => {
      this.profilePicture = self.sanitize(URL.createObjectURL(file));
    };
    this.profilePicFile = e.target.files[0];
    var data = {
      userId: this.userId,
      file: this.profilePicFile,
    };
    console.log(data);
    // this.service.updateProfilePic(data).subscribe((res: any) => {
    //   e.currentTarget.value = null;
    //   console.log(res);
    // });
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

  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
