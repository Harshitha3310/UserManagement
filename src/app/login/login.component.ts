import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginsuccess:any;
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  logininfo() {
    // this.regInfo.value.uName
    var data = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.pwd
    }
  
    
    this.service.login(data).subscribe(res=>{
      console.log(res);
      localStorage.setItem('userobj',JSON.stringify(res['result']));
      localStorage.setItem('isLogin',"true");
     localStorage.setItem('role',res['result']['role']);
     localStorage.setItem('token',res['token']);
      this.router.navigateByUrl('/getalldetails');
    },err =>{
      console.log(err)
      localStorage.clear()
      this.loginsuccess = true;
    })
    
      
    
  }


  constructor(private router: Router,private formBuilder: FormBuilder,private service:MainService) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pwd: ['', [Validators.required]]

    });
  }

  register() {
    this.router.navigateByUrl('/register');
  }


  ngOnInit() {
   
  }

}
