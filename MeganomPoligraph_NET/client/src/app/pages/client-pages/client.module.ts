import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from "./client-routing.module";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DeliveryComponent } from "./delivery/delivery.component";

@NgModule({
  imports: [
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    DeliveryComponent,
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule {}
