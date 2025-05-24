import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { checkUserRole } from "../../utils/checkUserRole";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { isSuperAdmin } = checkUserRole();

    if (isSuperAdmin) {
      return true;
    } else {
      this.router.navigate(["/admin"]);
      return false;
    }
  }
}
