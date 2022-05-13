import { formatDate } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loggedUser!:any
  tickets : any
  passengers : any
  passengerDetails:boolean = false
  cancelling : boolean = false
  displaying : boolean = false
  cancelStatus! : string
  flights : any
  flightDetails : boolean = false
  errorMessage : any

  constructor(private home:HomeService,private route:Router) { }

  ngOnInit(): void {
    this.displaying = true
    this.loggedUser = localStorage.getItem('userID')
    //console.log(this.loggedUser)
    if(this.loggedUser == null){
      this.route.navigateByUrl('/home')
    }
    
    this.home.getBookedTicketByEmail(this.loggedUser).subscribe(
      (res:any) => {this.tickets = res,this.displayTickets(this.tickets)}
    )
  }

  displayTickets(ticket:any){
    console.log(ticket)
    this.tickets = ticket
  }
  displayPassenger(passenger:any){
    this.passengerDetails = true
    this.flightDetails = false;
    if(passenger.length == 0)
      alert("This ticket is cancelled. No Passenger details found")
    console.log(passenger)
    this.passengers = passenger
  }

  getPassengerDetails(data : any)
  {
    console.log(data)
    this.home.getPassengerDetails(data).subscribe(
      (res:any) => {this.passengers = res,this.displayPassenger(this.passengers)} 
    )
  }

  getFlightDetails(data : any){
    console.log(data)
    this.home.getFlightDetails(data).subscribe(
      (res:any) => {this.flights = res,this.bookingHistory(this.flights)}
    )
  }
  
  searchFlights(){
    this.route.navigateByUrl('/search-flight')
  }
  bookingHistory(data : any){
    // console.log("BookingHistory")
    this.flightDetails = true;
    this.passengerDetails = false
    this.flights = data
  }
  getTicketsbyPNR(pnrNumber : any){
    console.log(pnrNumber)

  }

  today! : any 
  deptDate : any
  cancel(data:any,pnr : any,status : any){
    if(status == "Cancelled")
      alert("This ticket is already cancelled!")
    //if(data > Date.parse("2022-05-10T00:00:00"))
    console.log(data)
    this.today = formatDate(new Date(),'yyyy-MM-dd','en_US');
    this.deptDate = formatDate(data,'yyyy-MM-dd','en_US')
    if(this.today > this.deptDate)
      alert("This ticket cannot be deleted since the journey has end!!")
    else{
    this.home.cancelTicket(pnr).subscribe(
      (res : any) =>{this.cancelStatus = res,console.log(this.cancelStatus)}
    )
    alert('Please Login to continue')
    this.route.navigateByUrl('/home')
    }
    

    // this.home.cancelTicket(data).subscribe(
    //   {
    //     next : data =>{this.cancelStatus = data},
    //     error : error => {this.errorMessage = error.errorMessage,console.error('There was an error!', error)}
    //   }
    // )
    //this.route.navigateByUrl('/user')
    //location.reload();
    //window.location.reload()
  }


  logout(){
    console.log("Logged out")
    // window.location.reload()
    localStorage.removeItem('userID')
    this.route.navigateByUrl('/home')
  }

}
