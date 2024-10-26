import { Component } from '@angular/core';
import { AuthServiceService } from '../core/Services/auth-service.service';
import { Router } from '@angular/router';
import { Feather } from 'angular-feather/icons';
import { MatLabel } from '@angular/material/form-field';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    name:any;
    role:any;
    constructor(
       
       
        private authServiceService: AuthServiceService,
        private router: Router
    ) {
        this.getUserById()
      this.role = this.authServiceService.getRole()

    }
    getUserById(){
      
        this.authServiceService.getUserById(this.authServiceService.getUserId()).subscribe(res=>{
          console.log(res)
          if(res.role=='Worker'){
            this.name=res.fullName
  
          }else if(res.role=='Requester'){
            this.name=res.organization_name
  
          }else{
            this.name="Admin"
  
          }
        })
      }
}
