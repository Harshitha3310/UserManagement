import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization':  localStorage.getItem('token')
  });
  constructor(private http: HttpClient) { }
  rootUrl = './';
  regUrl = this.rootUrl + 'userdetails';
  LoginUrl = this.rootUrl + 'login';
  getAllDetailsUrl = this.rootUrl + 'getallusers';
  updateUrl = this.rootUrl + 'updateuser';
  deleteUrl = this.rootUrl + 'deleteuser';
  getParticularUser = this.rootUrl + 'getuserinfo';

  login(data){
    return this.http.post(this.LoginUrl,data);
  }

  
  regMethod(data){
    return this.http.post(this.regUrl,data);
  }

  
  getDetails(){
    return this.http.post(this.getAllDetailsUrl,{}, { headers:this.reqHeader});
  }

  
  upadate(data){
   return this.http.post(this.updateUrl,data,{ headers:this.reqHeader});
  }

  
  delete(data){
    return this.http.post(this.deleteUrl,data, { headers:this.reqHeader});
  }
  getparticularuser(data)
  {
    return this.http.post(this.getParticularUser,data, { headers:this.reqHeader});
  }
 
}
