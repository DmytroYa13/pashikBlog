import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/shared/service/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  toLog = "assets/login.png"
  loged = "assets/loged.png"
  icon:string = ""

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {

    if(!this.auth.isAuthenticated()){
      this.icon = this.toLog
    }
    else{
      this.icon = this.loged
    }

  }



}
