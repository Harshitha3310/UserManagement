import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../main.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  regInfo: FormGroup;
  titlelength: any = 0;
  titlelength1: any = 0;
  validForm1:any;
  file: any;
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ref: any;
  task: any;
  uploadProgress: any;
  downloadURL: Observable<any>;
  path: string;
  isimage: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: MainService, private afStorage: AngularFireStorage) {
    this.regInfo = this.formBuilder.group({
      uName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],

      pNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      gender: ['', [Validators.required]],
      comment: [''],
      pwd: ['', [Validators.required]]

    });
  }

  regInfoSub() {
    this.path = `upload/image/${Date.now()}`;
    const fileRef = this.afStorage.ref(this.path);

    const task = fileRef.put(this.file, { customMetadata: { blah: 'blah' } });
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
          var data = {
            "uname": this.regInfo.value.uName,
            "password": this.regInfo.value.pwd,
            "url": url,
            "number": this.regInfo.value.pNumber,
            "comments": this.regInfo.value.comment,
            "gender": this.regInfo.value.gender,
            "email": this.regInfo.value.email
          }
          this.service.regMethod(data).subscribe(res => {
            console.log("res", res);
            this.router.navigateByUrl('/');
          }, err => {
            this.router.navigateByUrl('/register');
          });
        });
      })
    ).subscribe();



  }

  checkTitle(event) {
    this.titlelength = event.target.value.trim().length;
  }

  checkTitle1(event) {
    console.log("event", this.regInfo)
    this.titlelength1 = event.target.value.trim().length;
  }

  ngOnInit() {

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





