import { Component, inject } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import { checkUserRole } from "../../utils/checkUserRole";

@Component({
  selector: "app-header",
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  translate = inject(TranslateService);
  platformId = inject(PLATFORM_ID);
  titleService = inject(Title);
  metaService = inject(Meta);
  router = inject(Router);
  route = inject(ActivatedRoute);
  currentLanguage = "ua";
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isHeaderVisible: boolean = true;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem("language");
      const defaultLang = savedLang ? savedLang : "ua";
      this.translate.use(defaultLang);
      this.currentLanguage = defaultLang;

      const { isAdmin, isSuperAdmin } = checkUserRole();
      this.isAdmin = isAdmin;
      this.isSuperAdmin = isSuperAdmin;
      this.updatePageTitle(defaultLang);
      this.updateMetaTags(defaultLang);

      this.isAdmin = this.router.url.includes("/admin");
      this.isHeaderVisible = !this.router.url.includes("/admin/login");

      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.isAdmin = this.router.url.includes("/admin");
        this.isHeaderVisible = !this.router.url.includes("/admin/login");
      });
    }
  }

  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.translateText(target.value);
    }
  }

  translateText(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(lang);
      this.currentLanguage = lang;
      localStorage.setItem("language", lang);
      this.updatePageTitle(lang);
      this.updateMetaTags(lang);
    }
  }

  updatePageTitle(lang: string) {
    const currentTitleCode = this.router.url.startsWith("/admin")
      ? "meta.title-admin"
      : "meta.title";

    this.translate.get(currentTitleCode).subscribe((translatedTitle: string) => {
      this.titleService.setTitle(translatedTitle || "Meganom Poligraph");
    });
  }

  updateMetaTags(lang: string) {
    let currentPath = this.router.url.split("?")[0].replace(/^\/|\/$/g, "");

    if (currentPath.startsWith("admin")) {
      return;
    }

    let metaKey = currentPath
      ? `${currentPath.replace(/\//g, "-")}-page-description`
      : "home-page-description";

    this.translate.get(`meta.${metaKey}`).subscribe((description: string) => {
      this.metaService.updateTag({
        name: "description",
        content: description || ""
      });
    });
  }

  getTranslatingLanguage() {
    return this.currentLanguage;
  }
}
