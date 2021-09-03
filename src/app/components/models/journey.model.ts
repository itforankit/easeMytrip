import { Bus } from "./bus.model";
import { Seat } from "./seat.model";
import { Journey_Route } from "./route.model";

export class Journey{
    bus:Bus|any;
    seats:Seat[] | any;
    fare:number|any;
    journey_route:Journey_Route|any;
}
export interface seat{
    seat:string
}