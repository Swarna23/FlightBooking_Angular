import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, ObservableLike } from 'rxjs';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl : string
  url : any

  constructor(private http : HttpClient) {
    this.baseUrl = "http://localhost:9000/api/"
   }

   httpHeader = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  }

  addAirline(flightId:string,flightName:string,fromPlace:string,toPlace:string,departure:Time,
              arrival:Time,seats:number,cost:number,meal:string,days:string,status:string):Observable<any>{
                this.url = this.baseUrl+"Admin/ScheduleAirLine/"+flightId + "/"+flightName + "/" +
                           fromPlace+"/"+toPlace+"/"+departure+"/"+arrival+"/"+seats+"/"+cost+"/"
                           +meal +"/"+days +"/"+status
                console.log(this.url);
                return this.http.post<any>(this.url,null);
  }

  getAirline():Observable<any>{
    this.url=this.baseUrl+"Admin/GetFlights"
    return this.http.get(this.url)
  }

  getBAlirline():Observable<any>{
    this.url = this.baseUrl+"Admin/GetBFlights"
    return this.http.get(this.url)
  }

  blockAirline(flightID:string):Observable<any>{
    this.url=this.baseUrl+"Admin/BlockAirline/"+flightID
    console.log(this.url)
    return this.http.put<any>(this.url,null)
  }

  UnblockAirline(flightID:string):Observable<any>{
    this.url=this.baseUrl+"Admin/UnBlockAirline/"+flightID
    console.log(this.url)
    return this.http.put<any>(this.url,null)
  }
}
