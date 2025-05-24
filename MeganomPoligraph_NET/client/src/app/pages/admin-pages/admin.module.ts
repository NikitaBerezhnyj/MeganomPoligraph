import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ProductsComponent } from "./products/products.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";
import { AdminsComponent } from "./admins/admins.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../../guards/auth/auth.guard";

@NgModule({
  imports: [
    LoginComponent,
    DashboardComponent,
    AnalyticsComponent,
    ProductsComponent,
    ManageProductComponent,
    AdminsComponent,
    ProfileComponent,
    CommonModule,
    AdminRoutingModule
  ],
  providers: [AuthGuard]
})
export class AdminModule {}
