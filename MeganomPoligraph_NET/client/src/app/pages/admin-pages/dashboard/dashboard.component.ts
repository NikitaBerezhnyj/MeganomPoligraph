import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { checkUserRole } from "../../../utils/checkUserRole";

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, TranslateModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  isSuperAdmin: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const { isSuperAdmin } = checkUserRole();
      this.isSuperAdmin = isSuperAdmin;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
