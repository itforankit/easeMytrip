import { Bus } from "./bus.model";
import { Seat } from "./seat.model";

export class Booking{
    $key:string|any
    location:string|any;
    bus:Bus|any;
    seat_book_user:SeatBook | any;
}

export interface SeatBook{
    $key:string;
    user_id:string;
    seats:Seat[];
}