import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Time } from '@angular/common';
import { passengerDetails } from '../models/passengerDetails';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl : string
  url : any


  constructor(private httpClient:HttpClient) {
    this.baseUrl = "http://localhost:9000/api/"
   }

   httpHeader = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json',
       'Access-Control-Allow-Origin' : '*'
     })
   }

   getRole(email : string,pass : string) : Observable<any>{
     this.url = this.baseUrl +"User/Login/" + email + "/" + pass
     console.log(this.url)
     return this.httpClient.get(this.url)
   }

   getBookedTicketByEmail(email:string):Observable<any>{
     this.url = this.baseUrl + "User/GetBookedTickets/" + email
     console.log(this.url)
     return this.httpClient.get(this.url)
   }

   getPassengerDetails(pnr : number):Observable<any>{
     this.url= this.baseUrl + "User/GetPassengerDetails/" + pnr
     console.log(this.url)
     return this.httpClient.get(this.url)
   }

   searchFlights(fromPlace:string,toPlace:string):Observable<any>{
     this.url = this.baseUrl + "User/SearchFlights/" + fromPlace +"/" + toPlace
     console.log(this.url)
     return this.httpClient.get(this.url)
   }

   cancelTicket(pnr:number):Observable<string>{
     this.url = this.baseUrl + "User/CancelTicket/"+pnr
     console.log(this.url)
     return this.httpClient.delete<string>(this.url)
   }

   bookTicket(fID:string,mailID:string,seats:number,meal:string,dept:Date,arr:Date,passName:any,passAge:any,passGend:any,seat:any):Observable<any>{
     this.url = this.baseUrl + "User/BookTickets/" + fID +"/"+ mailID +"/" + seats+"/" + meal+"/" + dept + "/" + arr +"/"+passName +"/" + passAge + "/" + passGend + "/" + seat 
     return this.httpClient.post<any>(this.url,null)
   }

   getFlightDetails(fid:string):Observable<any>{
     this.url = this.baseUrl +"Admin/GetFlightsDetails/" + fid
     return this.httpClient.get(this.url)
   }
   
}
