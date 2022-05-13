import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-block',
  templateUrl: './admin-block.component.html',
  styleUrls: ['./admin-block.component.scss']
})
export class AdminBlockComponent implements OnInit {

  flights:any
  bFlights: any
  flightIds : string[] =[]
  BflightIds : string[] =[]
  myform:any
  myform1:any
  block : any
  unblock : any
  submitted = false
  flightId:any
  flightId1:any
  result! : boolean 
  unBlocking : boolean = false
  blocking : boolean = true
  unBlocking1 : boolean = false
loggedUser : any

  constructor(private admin:AdminService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.admin.getAirline().subscribe(
      (res:any) => {this.flights = res,this.getFlights(this.flights)}
    )
    this.myform = this.formBuilder.group({
      flightId: ['', Validators.required],
    })
    this.myform1 = this.formBuilder.group({
      flightId1: ['', Validators.required],
    })
    this.loggedUser = localStorage.getItem('userID')
    //console.log(this.loggedUser)
    if(this.loggedUser == null){
      this.route.navigateByUrl('/home')
    }
  }

  get f() { return this.myform.controls; }
  get f1() { return this.myform1.controls; }

  getFlights(data:any){
    this.flights = data
    for(var i=0;i<this.flights.length;i++)
      this.flightIds.push(this.flights[i].flightId)
    console.log(this.flightIds)
  }

  blockAirline(){
    //this.admin.blockAirline()
    console.log(this.f.flightId.value)
    this.admin.blockAirline(this.f.flightId.value).subscribe(
      (res:any)=>{this.block = res,this.blockFlight(this.block)}
    )
  }

  unBlockAirline(){
    this.unBlocking = true
    this.blocking = false
    this.admin.getBAlirline().subscribe(
      (res:any) => {this.flights = res,this.getBFlights(this.flights)}
    )
  }

  getBFlights(data:any){
    this.bFlights = data
    if(this.bFlights.length == 0){
      alert("All flights are scheduled!")
      this.route.navigateByUrl('/admin-block')
    }
    this.unBlocking1 = true
    for(var i=0;i<this.bFlights.length;i++)
      this.BflightIds.push(this.bFlights[i].flightId)
    console.log(this.BflightIds)
  }

  blockFlight(data :  any){
    if(data == true){
      alert('Flight Unblock/UnBlock Success')
    }
    this.route.navigateByUrl('/admin-block')
  }

  releaseAirline(){
    console.log(this.f1.flightId1.value)
    this.admin.UnblockAirline(this.f1.flightId1.value).subscribe(
        (res: any) =>{this.unblock = res,this.blockFlight(this.unblock)}
    )
  }

  logout(){
    localStorage.removeItem('userID')
    //window.location.reload()
    this.route.navigateByUrl('/home')
  }

}
