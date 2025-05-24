import { Component, inject } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { ClientService } from "../../../services/client/client.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  name: string = "";
  phone: string = "";
  email: string = "";
  type: string = "";
  size: string = "";
  material: string = "";
  print: string = "";
  embossing: string = "";
  handles: string = "";
  circulation: number = 1;
  notes: string = "";

  submitMessage: string = "";

  services = [
    {
      link: "/example/paper-bags-laminated",
      image: "/images/services/lamination.png",
      headerKey: "home.home-services-paper-bags-laminated-header",
      descriptionKey: "home.home-services-paper-bags-laminated-description"
    },
    {
      link: "/example/logo-bags",
      image: "/images/services/logo.png",
      headerKey: "home.home-services-logo-bags-header",
      descriptionKey: "home.home-services-logo-bags-description"
    },
    {
      link: "/example/cardboard-bags",
      image: "/images/services/cardboard.png",
      headerKey: "home.home-services-cardboard-bags-header",
      descriptionKey: "home.home-services-cardboard-bags-description"
    },
    {
      link: "/example/kraft-bags",
      image: "/images/services/craft.png",
      headerKey: "home.home-services-kraft-bags-header",
      descriptionKey: "home.home-services-kraft-bags-description"
    },
    {
      link: "/example/gift-bags",
      image: "/images/services/present.png",
      headerKey: "home.home-services-gift-bags-header",
      descriptionKey: "home.home-services-gift-bags-description"
    },
    {
      link: "/example/branded-folders",
      image: "/images/services/folder.png",
      headerKey: "home.home-services-branded-folders-header",
      descriptionKey: "home.home-services-branded-folders-description"
    },
    {
      link: "/example/designer-paper-bags",
      image: "/images/services/design.png",
      headerKey: "home.home-services-designer-paper-bags-header",
      descriptionKey: "home.home-services-designer-paper-bags-description"
    },
    {
      link: "/example/uv-lacquer-bags",
      image: "/images/services/ultraviolet_varnish.png",
      headerKey: "home.home-services-uv-lacquer-bags-header",
      descriptionKey: "home.home-services-uv-lacquer-bags-description"
    },
    {
      link: "/example/embossed-bags",
      image: "/images/services/embossing.png",
      headerKey: "home.home-services-embossed-bags-header",
      descriptionKey: "home.home-services-embossed-bags-description"
    }
  ];

  types = [
    { value: "bag", label: "home.home-contact-form-type-options.bag" },
    { value: "folder", label: "home.home-contact-form-type-options.folder" }
  ];

  sizes = {
    bag: [
      { value: "14x21x8", label: "14x21x8" },
      { value: "20x30x10", label: "20x30x10" },
      { value: "25x32x8", label: "25x32x8" },
      { value: "32x40x10", label: "32x40x10" },
      { value: "60x45x20", label: "60x45x20" }
    ],
    folder: [
      { value: "A4", label: "A4" },
      { value: "A5", label: "A5" }
    ]
  };

  materials = [
    { value: "paper", label: "home.home-contact-form-material-options.paper" },
    {
      value: "cardboard",
      label: "home.home-contact-form-material-options.cardboard"
    },
    { value: "kraft", label: "home.home-contact-form-material-options.kraft" },
    {
      value: "custom",
      label: "home.home-contact-form-material-options.custom"
    }
  ];

  prints = [
    {
      value: "pantone_1_0",
      label: "home.home-contact-form-print-options.pantone_1_0"
    },
    {
      value: "pantone_2_0",
      label: "home.home-contact-form-print-options.pantone_2_0"
    },
    {
      value: "pantone_3_0",
      label: "home.home-contact-form-print-options.pantone_3_0"
    },
    {
      value: "pantone_4_0",
      label: "home.home-contact-form-print-options.pantone_4_0"
    },
    { value: "custom", label: "home.home-contact-form-print-options.custom" }
  ];

  embossings = [
    { value: "matte", label: "home.home-contact-form-embossing-options.matte" },
    {
      value: "glossy",
      label: "home.home-contact-form-embossing-options.glossy"
    },
    { value: "none", label: "home.home-contact-form-embossing-options.none" }
  ];

  handlesOptions = [
    { value: "cord", label: "home.home-contact-form-handles-options.cord" },
    {
      value: "ribbon_satin",
      label: "home.home-contact-form-handles-options.ribbon_satin"
    },
    {
      value: "ribbon_reps",
      label: "home.home-contact-form-handles-options.ribbon_reps"
    },
    { value: "none", label: "home.home-contact-form-handles-options.none" }
  ];

  platformId = inject(PLATFORM_ID);

  constructor(
    private translate: TranslateService,
    private clientService: ClientService
  ) {}

  getLabel(key: string): string {
    return this.translate.instant(key);
  }

  getLabelInUkrainian(key: string): string {
    const currentLang = this.translate.currentLang;
    this.translate.use("ua");
    const translatedValue = this.translate.instant(key);
    this.translate.use(currentLang);
    return translatedValue;
  }

  get sizeOptions() {
    return this.sizes[this.type as keyof typeof this.sizes] || [];
  }

  scrollToNextSection() {
    if (isPlatformBrowser(this.platformId)) {
      const nextSection = document.querySelector(".home-services-container") as HTMLElement;
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop - 64,
          behavior: "smooth"
        });
      }
    }
  }

  validateForm() {
    if (this.name === "") {
      return false;
    }
    if (this.email === "" && this.phone === "") {
      return false;
    }
    return true;
  }

  clearForm() {
    this.name = "";
    this.phone = "";
    this.email = "";
    this.type = "";
    this.size = "";
    this.material = "";
    this.print = "";
    this.embossing = "";
    this.handles = "";
    this.circulation = 1;
    this.notes = "";
  }

  submitForm() {
    if (this.validateForm()) {
      const mailData = {
        name: this.name,
        phone: this.phone === "" ? null : this.phone,
        email: this.email === "" ? null : this.email,
        type: this.type === "" ? null : this.type,
        size: this.size === "" ? null : this.size,
        material: this.material === "" ? null : this.material,
        print: this.print === "" ? null : this.print,
        embossing: this.embossing === "" ? null : this.embossing,
        handles: this.handles === "" ? null : this.handles,
        circulation: this.circulation,
        notes: this.notes === "" ? null : this.notes,
        language: this.translate.currentLang as "ua" | "en" | "ru"
      };

      this.clientService.sendClientMail(mailData).subscribe(
        (response: any) => {
          this.submitMessage = this.getLabel("home.home-contact-form-success");
          this.setSubmitResultClass(true);
          this.clearForm();
        },
        (error: any) => {
          console.error("Error sending mail", error);
          this.submitMessage = this.getLabel("home.home-contact-form-sending-error");
          this.setSubmitResultClass(false);
        }
      );
    }
  }

  setSubmitResultClass(isSuccess: boolean) {
    const submitResultElement = document.querySelector(".submit-result") as HTMLElement;
    if (submitResultElement) {
      if (isSuccess) {
        submitResultElement.classList.remove("contact-error");
        submitResultElement.classList.add("contact-success");
      } else {
        submitResultElement.classList.remove("contact-success");
        submitResultElement.classList.add("contact-error");
      }
      submitResultElement.textContent = this.submitMessage;

      setTimeout(() => {
        submitResultElement.textContent = "";
        submitResultElement.classList.remove("contact-success", "contact-error");
      }, 5000);

      this.submitMessage = "";
    }
  }
}
