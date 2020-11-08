import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthInterceptop } from 'src/app/shared/auth.interceptor';
import { User } from '../../shared/interface'
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  submited = false
  pSub: Subscription

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      console.log("public auth:AuthService");
      this.router.navigate(['/admin', 'board'])
    }

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  submitOn(form) {
    if (form.invalid) {
      return
    }

    this.submited = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.pSub = this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'board'])
      this.submited = false
    },
      () => this.submited = false
    )

    if (!this.auth.isAuthenticated()) {
      this.form.reset()
    }
  }

}
