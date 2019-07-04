import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  title = 'Welcome to User Management';

  

 }


@Component({
  selector: 'app-header',
  templateUrl: './app.header.html'
 
})
 
export class AppHeader implements OnInit {

  islogin = localStorage.getItem("isLogin");

  routes = [
    {
      name: "Login",        
      fun:'loginHandle()'
    },
    {
      name: "Register",         
      fun:'registerHandle()'
    }
  ]
  constructor(public router: Router) {

  }


  ngOnInit(){
    // if( this.islogin === "true"){
    //   this.routes = [
    //     {
    //       name: "Logout",        
    //       fun:'logoutHandler()'
    //     }
    //   ]
    //   this.router.navigateByUrl('/getalldetails')
     
    // }else{
    //   localStorage.clear();
    //   this.routes = [
    //     {
    //       name: "Login",        
    //       fun:'loginHandle()'
    //     },
    //     {
    //       name: "Register",         
    //       fun:'registerHandle()'
    //     }
    //   ]
    //   this.router.navigateByUrl('/')
     
    // }
  }

loginHandle(){
  this.router.navigateByUrl('/')
}
registerHandle(){
  this.router.navigateByUrl('/register')
}

  logoutHandler()
{
  console.log(this.routes)
  
  localStorage.clear();
 this.islogin = ''
  
 
  
}
} 