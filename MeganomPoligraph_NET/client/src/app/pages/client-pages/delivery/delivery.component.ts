import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-delivery",
  imports: [TranslateModule],
  templateUrl: "./delivery.component.html",
  styleUrls: ["./delivery.component.css"]
})
export class DeliveryComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {}

  getHtmlTranslation(key: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.translate.instant(key));
  }
}
