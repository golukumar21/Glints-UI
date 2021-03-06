import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private glints = environment.GLINTS;
  setUserInitials = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  setUserShortName(val: any) {
    this.setUserInitials.next(val);
  }

  public register(data: any) {
    return this.http.post(this.glints.register, data);
  }

  public login(data: any) {
    return this.http.post(this.glints.login, data, {
      observe: 'response',
    });
  }

  public logout() {
    this.router.navigate(['/']);
    this.clearLocalStorage();
  }

  public userDetails(data: any) {
    return this.http.get(this.glints.userDetails + data.userId, {
      observe: 'response',
    });
  }

  public updateProfilePic(formData: any) {
    var data = new FormData();
    data.append('userId', formData.userId);
    data.append('profile_picture', formData.profile_picture);
    return this.http.post(
      this.glints.userDetails + 'user_profile_picture',
      data,
      {
        observe: 'response',
      }
    );
  }

  public updateUserDetails(formData: any) {
    return this.http.put(
      this.glints.userDetails + 'user_details_update',
      formData
    );
  }

  public setLocalStorage(name: any, value: any) {
    localStorage.setItem(name, value);
  }

  public getLocalStorage(name: any) {
    return localStorage.getItem(name);
  }

  public removeLocalStorage(name: any) {
    localStorage.removeItem(name);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
