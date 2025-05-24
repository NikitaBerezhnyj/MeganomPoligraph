import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AuthService } from "../../../services/auth/auth.service";
import { TranslationService } from "../../../services/translation/translation.service";

@Component({
  selector: "app-login",
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  login: string = "";
  password: string = "";
  submitMessage: string = "";
  isSubmitting: boolean = false;
  isButtonDisabled: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  onPasswordVisibilityChange(event: any) {
    this.isPasswordVisible = event.target.checked;
  }

  validateForm(): boolean {
    if (this.login === "" || this.password === "") {
      return false;
    }
    return true;
  }

  submitForm() {
    if (this.validateForm()) {
      this.isButtonDisabled = true;
      this.isSubmitting = true;
      this.authService
        .login(this.login, this.password)
        .subscribe(
          response => {
            this.translationService
              .translateKey("login.login-success")
              .subscribe(translatedMessage => {
                this.submitMessage = translatedMessage;
                this.setSubmitResultClass(true);
              });

            setTimeout(() => {
              this.router.navigate(["/admin"]);
            }, 5000);
          },
          error => {
            console.error("Error during login", error);
            this.translationService
              .translateKey("login.login-error")
              .subscribe(translatedMessage => {
                this.submitMessage = translatedMessage;
                this.setSubmitResultClass(false);
              });
          }
        )
        .add(() => {
          this.isButtonDisabled = false;
        });
    } else {
      this.translationService
        .translateKey("login.login-validation-error")
        .subscribe(translatedMessage => {
          this.submitMessage = translatedMessage;
          this.setSubmitResultClass(false);
        });
    }
  }

  setSubmitResultClass(isSuccess: boolean) {
    const submitResultElement = document.querySelector(".submit-result") as HTMLElement;
    if (submitResultElement) {
      if (isSuccess) {
        submitResultElement.classList.remove("error");
        submitResultElement.classList.add("success");
      } else {
        submitResultElement.classList.remove("success");
        submitResultElement.classList.add("error");
      }
      submitResultElement.textContent = this.submitMessage;

      setTimeout(() => {
        submitResultElement.textContent = "";
        submitResultElement.classList.remove("success", "error");
      }, 5000);
    }
  }
}
