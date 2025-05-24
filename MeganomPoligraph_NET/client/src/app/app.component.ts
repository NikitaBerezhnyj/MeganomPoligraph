import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ClientService } from "./services/client/client.service";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { checkUserRole } from "./utils/checkUserRole";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private clientService: ClientService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (this.router.url.startsWith("/admin")) {
      return;
    }

    if (isBrowser) {
      const { isAdmin, isSuperAdmin } = checkUserRole();
      if (isAdmin || isSuperAdmin) {
        return;
      }
      this.clientService.getIPAddress().subscribe({
        next: ipResponse => {
          const visitorData = {
            IPAddress: ipResponse.ip,
            UserAgent: navigator.userAgent,
            VisitTime: new Date().toISOString()
          };

          this.clientService.trackVisit(visitorData).subscribe({
            next: () => {},
            error: err => {
              console.error("Error sending data", err);
            }
          });
        },
        error: err => {
          console.error("Error getting IP address", err);
        }
      });
    }
  }
}
