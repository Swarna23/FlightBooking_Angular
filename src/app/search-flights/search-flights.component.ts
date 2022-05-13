import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';
import { NgModule } from '@angular/core';
import { passengerDetails } from '../models/passengerDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {
  sourceList = ['Bangalore','Madurai','Chennai','Coimbatore','Noida','Mumbai']
  destList=["Bangalore","Madurai","Chennai","Coimbatore","Noida","Mumbai"]
  submitted = false
  myform:any
  loggedUser : any
  myform1:any
  myform2:any
  from : any
  to : any
  flights : any
  hours:any
  searched : boolean = false
  booking : boolean = false
  noOfSeats : any
  noOfSeatsList : number[] = []
  passengerAdding : boolean = false
  count : number =0
  passenger! : passengerDetails
  passengerList! : passengerDetails []
  flightID:any
  mailID:any
  meal : any
  departure : any
  arrival : any
  mealType : any
  bookingStatus : any
  passName : any
  passAge : any
  passGender : any
  seated:any
 
  

  constructor(private formBuilder: FormBuilder,private home:HomeService,private route:Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('userID')
    if(this.loggedUser == null){
      this.route.navigateByUrl('/home')
    }
    this.myform = this.formBuilder.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
    })
    this.myform1 = this.formBuilder.group({
      seats:['',Validators.required]
    })
    
    this.myform2 = this.formBuilder.group({
      bookdate:['',Validators.required]
    })

    this.loggedUser = localStorage.getItem('userID')
    //console.log(this.loggedUser)
    if(this.loggedUser == null){
      this.route.navigateByUrl('/home')
    }
  }

  get f() { return this.myform.controls; }
  get f1() {return this.myform1.controls;}
  get f2() {return this.myform2.controls;}

  onSubmit(){
    if(this.f.fromPlace.value == this.f.toPlace.value){
      alert("Source and Destination cannot be same")
      this.myform.reset()
    }
    this.from = this.f.fromPlace.value
    this.to = this.f.toPlace.value
    this.home.searchFlights(this.from,this.to).subscribe(
      (res:any) => {this.flights = res,this.displayFlights(res)}
    )
  }

  displayFlights(data:any){
    this.flights = data
    if(this.flights.length ==0){
      alert("No Flights found for the specified route")
      this.myform.reset()
    }
    //console.log(this.flights[2].departure[this.hours])
    else{
    this.searched = true
    }
  }

  bookTicket(fId:any,meal:any,dept:any,arr:any){
    console.log(fId + " "+ meal + " " + dept + " "+ arr)
    this.flightID = fId
    this.mailID = localStorage.getItem('userID')
    this.mealType = meal
    this.booking=true
  }

  seatsBooked(){
    this.noOfSeats = this.f1.seats.value
    // this.departure = this.f1.dept.value
    // this.arrival = this.f1.arr.value
    // for(var i=1;i<=this.noOfSeats;i++){
    //   console.log("abc")
    //   //this.getPassengerDetails()
    //   this.passengerAdding = true;
    // }
    this.passengerDetails(this.noOfSeats)
    console.log(this.f1.seats.value)
  }

  passengerDetails(seats : any){
    for(var i=1;i<=seats;i++)
      this.noOfSeatsList.push(i)
    //this.getPassengerDetails()
    this.passengerAdding = true;
    console.log(this.noOfSeatsList)
  }
  
  // getPassengerDetails(){
  //   this.passengerAdding = true;
  // }

  finalBooking(){
    console.log(this.f2.name.value)
    this.passengerAdding = false
  }
  dateBooked(){
    console.log(this.f2.bookdate.value)
    this.departure = this.f2.bookdate.value
    this.arrival = this.f2.bookdate.value
  }

  index : number = 0
  booked : any
  onClick(name:any,age:any,gender:any,seat:any){

    // this.passenger = 
    //   {
    //     passengerName: name,passengerAge : age, passengerGender : gender , seatNumber : seat
    //   }
      //this.departure = Date.now
      console.log(this.flightID,this.mailID,this.noOfSeats,this.mealType,this.departure,this.arrival)
      console.log(name,age,gender,seat)

      this.home.bookTicket(this.flightID,this.mailID,this.noOfSeats,this.mealType,this.departure,this.arrival,name,age,gender,seat).subscribe(
        (res:any) => {this.booked = res,console.log(this.booked)}
      )
      alert("Ticket Booked Successfully!!")
      this.route.navigateByUrl('/user')
    
      // this.home.bookTicket(this.flightID,this.mailID,this.noOfSeats,this.mealType,this.departure,this.arrival,this.passenger).subscribe(
      //   (res:any) => {this.bookingStatus = res,console.log(this.bookingStatus)}
      // )

    // this.passengerList.push(this.passenger)
    // this.passenger[this.index].passengerName = name
    // this.passenger[this.index].passengerAge = age
    // this.passenger[this.index].passengerGender = gender
    // this.passenger[this.index].seatNumber = seat
    // this.index = this.index+1;
    //console.log(this.index)
  }

  logout(){
    localStorage.removeItem('userID')
    // window.location.reload()
    this.route.navigateByUrl('/home')
  }
}
