import { Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-footer",
  imports: [TranslateModule, CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css"
})
export class FooterComponent {
  router = inject(Router);
  isAdmin: boolean = false;
  isFooterVisible: boolean = true;

  ngOnInit() {
    this.isAdmin = this.router.url.includes("/admin");
    this.isFooterVisible = !this.router.url.includes("/admin/login");

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isAdmin = this.router.url.includes("/admin");
      this.isFooterVisible = !this.router.url.includes("/admin/login");
    });
  }
}
