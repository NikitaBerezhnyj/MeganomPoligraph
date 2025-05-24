import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { RequestsComponent } from "./requests/requests.component";
import { ProductsComponent } from "./products/products.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";
import { AdminsComponent } from "./admins/admins.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../../guards/auth/auth.guard";
import { AdminGuard } from "../../guards/admin/admin.guard";

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: "analytics",
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "analytics/requests",
    component: RequestsComponent,
    canActivate: [AuthGuard]
  },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: "products/manage",
    component: ManageProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/manage/:id",
    component: ManageProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admins",
    component: AdminsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
