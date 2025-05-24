import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-error",
  imports: [TranslateModule],
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorCode: string = "404";
  error: any = {};
  currentUrl: string = "";
  langChangeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (typeof window !== "undefined") {
      this.currentUrl = window.location.href;
    }

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadErrorMessages();
    });

    this.route.params.subscribe(params => {
      this.errorCode = params["errorCode"] || "404";
      this.loadErrorMessages();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  getErrorCode() {
    return this.errorCode;
  }

  loadErrorMessages() {
    const replaceUrlInMessage = (message: string): string => {
      return message.replace("{url}", this.currentUrl);
    };

    const getTranslation = (key: string): string => {
      return this.translate.instant(key);
    };

    switch (this.errorCode) {
      case "404":
        const message404 = getTranslation("error.404-error-message");
        this.error = {
          title: getTranslation("error.404-error-header"),
          message: replaceUrlInMessage(message404),
          subMessage: getTranslation("error.error-standard-message"),
          homeButton: getTranslation("error.error-home-button"),
          backButton: getTranslation("error.error-back-button")
        };
        break;
      case "403":
        const message403 = getTranslation("error.403-error-message");
        this.error = {
          title: getTranslation("error.403-error-header"),
          message: replaceUrlInMessage(message403),
          subMessage: getTranslation("error.error-standard-message"),
          homeButton: getTranslation("error.error-home-button"),
          backButton: getTranslation("error.error-back-button")
        };
        break;
      default:
        const messageDefault = getTranslation("error.default-error-message");
        this.error = {
          title: getTranslation("error.default-error-header"),
          message: replaceUrlInMessage(messageDefault),
          subMessage: getTranslation("error.error-standard-message"),
          homeButton: getTranslation("error.error-home-button"),
          backButton: getTranslation("error.error-back-button")
        };
        break;
    }
  }
}
