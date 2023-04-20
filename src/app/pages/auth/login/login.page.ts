import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { CookieService } from 'ngx-cookie-service/public-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup = new FormGroup({})
  token:any

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private route:Router,
  ) {
    this.authService.token.subscribe((res:any)=>{
      this.token = res.token
      if(this.token?.length > 0){
        this.route.navigate(['/home'])
      }
    })
    this.authService.leerToken()
  }


  ngOnInit(): void {
   this.initialForms()   
  }

  initialForms() {
    this.loginForm = this.formBuilder.group({
      email: ['luis2@gmail.com', [Validators.required, Validators.email]],
      password: ['123456789', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
        let value = this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        console.log(value)
    }
  }

  

}
