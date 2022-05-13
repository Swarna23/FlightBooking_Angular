import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';
import { Users } from '../models/users';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //test : object = {'0':0}
  loginForm:any
  submitted = false
  loading = false
  userID! : string
  password! : string
  


  constructor(private formBuilder: FormBuilder,private router: Router,private home:HomeService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  isUser(data : any){
    if(data==0)
      this.router.navigateByUrl('/user')
    if(data==1)
      this.router.navigateByUrl('/admin')
    if(data==-1)
      alert("Please Enter Valid Credentials")
  }

  setLoggedUser(user : string){
    localStorage.setItem('userID',user)
  }

  onSubmit(){
    this.userID = this.f.username.value
    this.password = this.f.password.value
    this.home.getRole(this.f.username.value,this.f.password.value).subscribe(
      (res : any) =>{this.isUser(res),this.setLoggedUser(this.f.username.value)}
    )
  }

}
