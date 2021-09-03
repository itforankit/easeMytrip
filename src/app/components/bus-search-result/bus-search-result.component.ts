import { Component, OnInit, OnDestroy,TemplateRef } from '@angular/core';
import { SelectBusService } from 'src/app/services/select-bus.service';
import { Subscription } from 'rxjs';
import { Bus } from '../models/bus.model';
import {BsModalService} from 'ngx-bootstrap/modal'
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-search-result',
  templateUrl: './bus-search-result.component.html',
  styleUrls: ['./bus-search-result.component.css']
})
export class BusSearchResultComponent implements OnInit,OnDestroy {
  subscription:Subscription|any;
  buses:Bus[]=[];
  modalRef:BsModalRef|any;
  route=new Object();

  constructor(
    private BusService:SelectBusService,
    private modalService: BsModalService,
    private router:Router
  ) { }
  ngOnInit() {
    this.route=JSON.parse(localStorage.getItem("route")||'{}');
    if(!this.route){
      this.router.navigate([''])
    }
    this.subscription=this.BusService.castId.subscribe(
      res=>this.getAllBus(res)
    )
  }
  getAllBus(res: any){
    let bus=new Object();
    this.BusService.getBus(res)
    .subscribe(
      res=>{
        for(let key in res){
          // tketID =(<any>res)[key];
          bus=(<any>res)[key];
          (<any>bus)['$key']=key;
          this.buses.push(bus as Bus);
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openModal(template: TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
  }

    closeModal(){
    this.modalRef?.hide();
  }

}
