import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
    ) { }

  ngOnInit(): void {
  }

  logOut(e){
    e.preventDefault()
    this.auth.logout()
    this.router.navigate(['/'])
  }
}
