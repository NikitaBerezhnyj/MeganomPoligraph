import { Routes } from "@angular/router";
import { ErrorComponent } from "./pages/error/error.component";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/client-pages/client.module").then(m => m.ClientModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./pages/admin-pages/admin.module").then(m => m.AdminModule)
  },
  {
    path: "**",
    component: ErrorComponent
  }
];
