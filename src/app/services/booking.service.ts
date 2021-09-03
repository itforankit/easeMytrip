import { Injectable } from '@angular/core';
import { Journey } from '../components/models/journey.model';
import {HttpClient, JsonpClientBackend} from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../components/models/user.model'; 
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BookingService {
  journey_info=new BehaviorSubject('')
  cast=this.journey_info.asObservable();
  //private UserId;
  private Root_Url="https:bdbusticket.firebaseio.com/"
  constructor(
    private http:HttpClient,
    private UserService:UserService,
    private router:Router
  ) { }
  async seatBooking(journey:Journey, _user: any){
    let busId=journey.bus?.$key;
    let booking = new Object();
    let key = new Date(journey.journey_route?.date).getTime();
    //user.lastActive = new Date(user.lastActive);
    await this.createUserId(_user).subscribe(
      res=>{
        booking={
          user_id:Object.values(res)[0],
          seats:journey.seats
        }
        this.checkBookingDate_BusInfo(key, journey, booking, busId)
      }
    );
  }
  private async createBookingDate(journey: Journey, key: any, booking: any, busId: any){
    await this.create(journey,key,busId,booking)
  }
  private async create(journey:Journey, key: any, busId: any, booking: any){
    let location=journey.journey_route?.leaving_form+' to ' + journey.journey_route?.going_to;
    this.http.put(this.Root_Url + 'booking/' + key+ '/' + busId + '.json',{
      bus:{
        location:location,
        name: journey.bus?.name,
        coach_type:journey.bus?.coach_type,
        nfarename: journey.bus?.fare,
        time: journey.bus?.time,
        seat: journey.bus?.seat
      }
    })
    .subscribe(res=>{
      this.createBooking(booking, key, busId);
    },
    error=>console.log(error) 
    )
  }
  private checkBusID(busId: any, key: string, booking: any, journey: Journey){
    let busArray: any[]=[];
    this.http.get(this.Root_Url + 'booking/' + key + '.json')
    .subscribe(res=>{
      for(let key in res){
        busArray.push(key)
      }
      if(busArray.indexOf(String(busId))>-1){
        this.createBooking(booking, key, busId);
      }
      else{
        this.create(journey,key,busId,booking);
      }
    });
  }
 private async checkBookingDate_BusInfo(key:any,journey: any, booking: any, busId: any) 
 {
   let keys:any=[];
   this.http.get(this.Root_Url + 'booking.json')
   .subscribe(
     res=>{
       for(let key in res){
         keys.push(key)
       }
       if(keys.indexOf(String(key))>-1){
         this.checkBusID(busId,key,booking,journey)
       }else{
         this.createBookingDate(journey,key,booking,busId);
       }
     }
   );
 }
 private createBooking(booking: any,key: string,busId: string){
   let tketID:any;
   this.http.post(this.Root_Url+'booking/'+ key + '/'+ busId+'/seat_booking.json',booking)
   .subscribe(res=> {
     for(let key in res){
       tketID =(<any>res)[key];
       //let secondValue: string = (<any>someObject)[key];
       //[key: string]: string
       //var map: { [key: string]: any } = {};
     }
     this.createPrintView(tketID);
   }, err=>console.log(err));
 }
 createUserId(user: any){
   localStorage.setItem("user",JSON.stringify(user))
   return this.UserService.createUser(user)
 }
 createPrintView(tketID:any){
   //localStorage.getItem('currentUser')||'{}')
   let journey = JSON.parse(localStorage.getItem('journey')||'{}');
   let user = JSON.parse(localStorage.getItem("user")||'{}');
   let Ticket={
     ticketId:tketID,
     journey:journey,
     user:user
   }
   this.getJourneyInfo(Ticket);
   this.router.navigate(['print']);
 }
 getJourneyInfo(Ticket:any){
  this.journey_info.next(Ticket);
  localStorage.removeItem("journey");
  localStorage.removeItem("route");
  localStorage.removeItem("user");
 }
}
