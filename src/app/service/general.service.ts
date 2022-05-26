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
    return this.http.post(this.glints.userDetails, data, {
      observe: 'response',
    });
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
