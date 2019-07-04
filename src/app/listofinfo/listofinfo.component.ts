import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-listofinfo',
  templateUrl: './listofinfo.component.html',
  styleUrls: ['./listofinfo.component.scss']
})
export class ListofinfoComponent implements OnInit {
  updateInfo: FormGroup;
  deleteInfo: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  titlelength: any = 0;
  titlelength1: any = 0;
  validForm1:any;
  altEmail: any;
  userinfo1: any;
  url: any;
  uname: any;
  uName: any;
  pNumber: any;
  email: any;
  uname_data: any;
  phone: any;
  email_delete: any;
  isLoggedIn: boolean;
  isedit: boolean;
  isdelete: boolean;
  isupdate: boolean;
  shoppingItemList: any = [];
  shoppingItemList_item: any = [];
  path: string;
  router: any;
  role: any;
  gender: any;
  ischeck: boolean;
  file: any;
  isimage: boolean;
  isdelete_alert: boolean;
  is_delete_solve: boolean;
  constructor(private formBuilder: FormBuilder, private service: MainService, private afStorage: AngularFireStorage) {

    this.updateInfo = this.formBuilder.group({
      uName: ['', [Validators.required]],
      email: [''],

      pNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]]


    });
    this.deleteInfo = this.formBuilder.group({
      uName: ['', [Validators.required]],
      email: [''],
      pUrl: ['', [Validators.required]],
      pNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]]

    });

  }
  func(col) {
    var obj = JSON.parse(localStorage.getItem('userobj'));
    console.log(obj['email']);
    var email = obj['email'];
    var role = obj['role'];
    if (role == 'admin') {
      return false;
    }
    else {
      if (col.email === email) {
        this.isedit = false;
        return false;

      }
      else {
        this.isedit = true;
        return true;
      }
    }

  }

  getItem() {
    var role_login = localStorage.getItem('role');

    this.service.getDetails().subscribe(res => {
      console.log(res);
      this.shoppingItemList = res;

      if (role_login === 'admin') {

        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    },
      err => {
        console.log(err);
      })
  }



  userinfo(col) {
    console.log(col);
    this.email = col.email;
    this.uName = col.uname;
    this.phone = col.number;


  }
  userinfo_delete(col) {
    console.log(col);
    this.email_delete = col.email;

  }
  userinfo_view(col) {
    console.log(col);

    this.email = col.email;
    this.uName = col.uname;
    this.pNumber = col.number;
    this.url = col.url;
    this.role = col.role;
    this.gender = col.gender;


  }
  checkTitle(event) {
    this.titlelength = event.target.value.trim().length;
  }

  checkTitle1(event) {
    this.titlelength1 = event.target.value.trim().length;
  }
  ngOnInit() {
    this.getItem();

  }

  update() {

    var username = localStorage.getItem('userobj');
    this.path = `upload/image/${Date.now()}`;
    const fileRef = this.afStorage.ref(this.path);
    if (this.file) {
      const task = fileRef.put(this.file, { customMetadata: { blah: 'blah' } });
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            var data = {
              "uname": this.updateInfo.value.uName,
              "password": this.updateInfo.value.pwd,
              "url": url,
              "number": this.updateInfo.value.pNumber,
              "comments": this.updateInfo.value.comment,
              "gender": this.updateInfo.value.gender,
              "email": username,
              "altemail": this.updateInfo.value.email
            }
            this.service.upadate(data).subscribe(res => {
              console.log("res", res);
              this.isupdate = true;
              setTimeout(() => this.isupdate = false, 1000)
              this.getItem();

            }, err => {
              console.log(err);
              this.ischeck = false;
              setTimeout(() => {
              this.ischeck = false;
                this.isupdate = false
              }, 1000)
            }
            );
          });
        })
      ).subscribe();
    }
    else {
      var data = {
        "uname": this.updateInfo.value.uName,
        "password": this.updateInfo.value.pwd,
        "url": this.url,
        "number": this.updateInfo.value.pNumber,
        "comments": this.updateInfo.value.comment,
        "gender": this.updateInfo.value.gender,
        "email": username,
        "altemail": this.updateInfo.value.email
      }
      this.service.upadate(data).subscribe(res => {
        console.log("res", res);
        this.isupdate = true;

      }, err => {
        console.log(err);
        this.ischeck = false;
      }
      );
    }
  }




  deleteUser() {
    alert(this.email_delete)
    var data = {
      "altEmail": this.email_delete,

    }
    this.service.delete(data).subscribe(res => {
      console.log("res", res);
      this.isdelete_alert = true;
      setTimeout(() => this.isdelete_alert = false, 1000)
      this.getItem();
    },
      err => {
        console.log(err);
        this.is_delete_solve = true;
        setTimeout(() => this.is_delete_solve = false, 1000)
      });
  }
  returnFiletype(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  onPersonEdit(e) {

    this.file = e.target.files[0];
    let filetype = this.returnFiletype(this.file.name)
    console.log(filetype[0]);
    if (filetype[0] === "png" || filetype[0] === "jpg") {

      this.isimage = false;
    }
    else {

      this.isimage = true;
    }

  }

}
