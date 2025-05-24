import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { ExampleComponent } from "./example/example.component";

const allowedCategories = [
  "paper-bags-laminated",
  "logo-bags",
  "cardboard-bags",
  "kraft-bags",
  "gift-bags",
  "branded-folders",
  "designer-paper-bags",
  "uv-lacquer-bags",
  "embossed-bags"
];

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "delivery", component: DeliveryComponent },
  { path: "example", component: ExampleComponent },
  {
    path: "example/:category",
    component: ExampleComponent,
    data: { allowedCategories }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
