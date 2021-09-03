import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusSearchResultComponent } from './components/bus-search-result/bus-search-result.component';
import { PrintComponent } from './components/print/print.component';
import { SelectBusComponent } from './components/select-bus/select-bus.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SelectBusService } from './services/select-bus.service';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BusSearchResultComponent,
    PrintComponent,
    SelectBusComponent,
    SelectSeatComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [SelectBusService,
  BookingService,
UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
