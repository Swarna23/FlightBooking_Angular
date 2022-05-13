import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  submitted = false
  myform:any
  flightID:any
  flightName:any
  fromPlace:any
  toPlace:any
  dept:any
  arr:any
  seats:any
  cost:any
  meal:any
  status:any
  day : any
  days = ["Daily",'WeekDays','Weekends']
  result:any
  sourceList = ['Bangalore','Madurai','Chennai','Coimbatore','Noida','Mumbai']
  destList=["Bangalore","Madurai","Chennai","Coimbatore","Noida","Mumbai"]
  mealList=['Veg','Non-Veg','Veg&Non-Veg']
  adding = false
  loggedUser : any

  constructor(private formBuilder: FormBuilder,private admin:AdminService,private router: Router) { }

  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      flightID: ['', Validators.required],
      flightName: ['', Validators.required],
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      dept: ['', Validators.required],
      arr: ['', Validators.required],
      seats: ['', Validators.required],
      cost: ['', Validators.required],
      meal: ['', Validators.required],
      day:['',Validators.required],
      // status: ['', Validators.required]
  });
  this.loggedUser = localStorage.getItem('userID')
    //console.log(this.loggedUser)
    if(this.loggedUser == null){
      this.router.navigateByUrl('/home')
    }
    
  }

  get f() { return this.myform.controls; }

  addAirline(){
    console.log("Adding Airline")
    console.log(this.sourceList)
    this.adding = true
  }
  navigate(data : any){
    if(data==true){
    alert("Flight Details Added Successfully")
    this.myform.reset()
    }
    else{
      alert("Some error occurred")
    }
  }

  onSubmit(){
    console.log(this.f.flightID.value)
    this.flightID = this.f.flightID.value
    this.flightName = this.f.flightName.value
    this.fromPlace = this.f.fromPlace.value
    this.toPlace = this.f.toPlace.value
    this.dept = this.f.dept.value
    this.arr = this.f.arr.value
    this.seats = this.f.seats.value
    this.cost = this.f.cost.value
    this.meal = this.f.meal.value
    this.day=this.f.day.value
    this.status = "Scheduled"
    this.admin.addAirline(this.flightID,this.flightName,this.fromPlace,this.toPlace,
                          this.dept,this.arr,this.seats,this.cost,this.meal,this.day,this.status).subscribe
                          ((res:any) =>{this.result = res,this.navigate(this.result)})
  }

  blockAirline(){
    this.router.navigateByUrl("/admin-block")
  }

  logout(){
    localStorage.removeItem('userID')
    // window.location.reload()
    this.router.navigateByUrl('/home')
    

  }

}
