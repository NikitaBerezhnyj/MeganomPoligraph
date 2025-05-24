import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Product } from "../../../interfaces/product";
import { Localization } from "../../../interfaces/localization";
import { ProductService } from "../../../services/product/product.service";
import { RichAlertService } from "../../../services/rich-alert/rich-alert.service";
import { TranslationService } from "../../../services/translation/translation.service";
import { RichTextareaComponent } from "../../../components/rich-textarea/rich-textarea.component";
import { checkUserId } from "../../../utils/checkUserId";

@Component({
  selector: "app-manage-product",
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, TranslateModule, RichTextareaComponent],
  templateUrl: "./manage-product.component.html",
  styleUrls: ["./manage-product.component.css"]
})
export class ManageProductComponent implements OnInit, OnDestroy {
  isEditMode: boolean = false;
  productId: string = "";
  activeLanguage: string = "ua";
  languages: string[] = ["ua", "ru", "en"];
  validationErrors: string[] = [];
  requestResult: string = "";
  isRequestError: boolean = false;
  localization: Localization = {
    ua: "",
    ru: "",
    en: ""
  };

  productLockTimeout: any;
  isLocked: boolean = false;
  lockEndTime: number = 0;
  alertShown: boolean = false;

  categoryOptions = [
    { value: 1, label: "Paper Bags Laminated", key: "paper-bags-laminated" },
    { value: 2, label: "Logo Bags", key: "logo-bags" },
    { value: 3, label: "Cardboard Bags", key: "cardboard-bags" },
    { value: 4, label: "Kraft Bags", key: "kraft-bags" },
    { value: 5, label: "Gift Bags", key: "gift-bags" },
    { value: 6, label: "Branded Folders", key: "branded-folders" },
    { value: 7, label: "Designer Paper Bags", key: "designer-paper-bags" },
    { value: 8, label: "UV Lacquer Bags", key: "uv-lacquer-bags" },
    { value: 9, label: "Embossed Bags", key: "embossed-bags" }
  ];

  selectedCategories: number[] = [];
  selectedImage: string | null = null;
  private langChangeSubscription!: Subscription;

  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private richAlertService: RichAlertService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.productId = id;
        this.loadProductData(+id);
        this.startLockTimer();
      }
    });

    this.loadCategoryOptions();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadCategoryOptions();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();

    if (this.productLockTimeout) {
      clearTimeout(this.productLockTimeout);
    }
  }

  startLockTimer(): void {
    this.lockEndTime = Date.now() + 30 * 60 * 1000;

    this.productLockTimeout = setTimeout(
      () => {
        this.showLockAlert();
      },
      30 * 60 * 1000
    );
  }

  async showLockAlert(): Promise<void> {
    if (!this.alertShown) {
      this.alertShown = true;
      const confirmMessage = await this.translationService.translateKeyAsync(
        "manage-product.manage-product-confirm-lock"
      );
      const continueLock = await this.richAlertService.confirm(confirmMessage);
      if (continueLock) {
        this.extendLock();
      } else {
        window.location.href = "/admin/products";
      }
    }
  }

  async extendLock(): Promise<void> {
    const adminId = checkUserId();
    try {
      await this.productService.lockProduct(+this.productId, adminId).toPromise();
      this.alertShown = false;
      this.startLockTimer();
    } catch (error) {
      const errorMessage = await this.translationService.translateKeyAsync(
        "manage-product.manage-product-error-confirm-lock"
      );

      this.richAlertService.show({
        message: errorMessage
      });
      window.location.href = "/admin/products";
    }
  }

  async loadCategoryOptions() {
    this.categoryOptions = await Promise.all(
      this.categoryOptions.map(async option => ({
        ...option,
        label: await this.translationService.translateKeyAsync(
          `manage-product.manage-product-categories.${option.key}`
        )
      }))
    );
  }

  loadProductData(id: number): void {
    this.productService.getProductById(id).subscribe((product: Product) => {
      if (!product) return;

      this.selectedCategories = this.mapKeysToCategories(product.productCategories);

      this.localization = {
        ua: product.productDescriptions["ua"],
        ru: product.productDescriptions["ru"],
        en: product.productDescriptions["en"]
      };

      this.selectedImage = product.imageUrl || null;

      this.isLocked = product.isLocked || false;
    });
  }

  mapKeysToCategories(keys: string[]): number[] {
    return keys
      .map(categoryKey => {
        const category = this.categoryOptions.find(option => option.key === categoryKey);
        return category ? category.value : null;
      })
      .filter((value): value is number => value !== null);
  }

  mapCategoriesToKeys(categories: number[]): string[] {
    return categories
      .map(categoryValue => {
        const category = this.categoryOptions.find(option => option.value === categoryValue);
        return category ? category.key : null;
      })
      .filter((key): key is string => key !== null);
  }

  setLanguage(language: string): void {
    if (this.languages.includes(language)) {
      this.activeLanguage = language;
    }
  }

  onDescriptionChange(updatedText: string, language: string): void {
    if (this.languages.includes(language)) {
      this.localization[language] = updatedText;
    }

    this.validationErrors = this.validationErrors.filter(err => err !== "description");
  }

  onCategoryChange(): void {
    this.validationErrors = this.validationErrors.filter(err => err !== "category");
  }

  selectImage(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result as string;

          this.validationErrors = this.validationErrors.filter(err => err !== "image");
        }
      };

      reader.readAsDataURL(file);
    }
  }

  getPlaceholder(lang: string): string {
    const placeholders: Record<string, string> = {
      ua: "Напишіть гарний опис продукту...",
      ru: "Напишите красивое описание продукта...",
      en: "Write beautiful product description..."
    };
    return placeholders[lang] || "Enter description...";
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add("drag-over");
  }

  onDragLeave(event: DragEvent): void {
    (event.currentTarget as HTMLElement).classList.remove("drag-over");
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove("drag-over");

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  processFile(file: File): void {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("Невірний формат файлу. Дозволені лише зображення.");
    }
  }

  validationProduct(): boolean {
    this.validationErrors = [];

    if (!this.selectedImage) {
      this.validationErrors.push("image");
    }

    if (!this.selectedCategories.length) {
      this.validationErrors.push("category");
    }

    if (!this.localization["ua"] && !this.localization["ru"] && !this.localization["en"]) {
      this.validationErrors.push("description");
    }

    return this.validationErrors.length === 0;
  }

  saveProduct(): void {
    if (this.validationProduct()) {
      const product: Product = {
        productId: this.productId ? +this.productId : 0,
        imageUrl: this.selectedImage || "",
        isLocked: this.isLocked,
        productCategories: this.mapCategoriesToKeys(this.selectedCategories),
        productDescriptions: Object.fromEntries(
          Object.entries(this.localization).map(([languageCode, description]) => [
            languageCode,
            description
          ])
        )
      };

      this.isRequestError = false;

      if (this.productId) {
        this.productService.updateProduct(+this.productId, product).subscribe(
          () => {
            this.requestResult = "manage-product.manage-product-response-success-edit";
            this.isRequestError = false;
            setTimeout(() => {
              window.location.href = "/admin/products";
            }, 5000);
          },
          () => {
            this.requestResult = "manage-product.manage-product-response-error-edit";
            this.isRequestError = true;
            setTimeout(() => {
              this.requestResult = "";
            }, 5000);
          }
        );
      } else {
        this.productService.addProduct(product).subscribe(
          () => {
            this.requestResult = "manage-product.manage-product-response-success-add";
            this.isRequestError = false;
            setTimeout(() => {
              window.location.href = "/admin/products";
            }, 5000);
          },
          () => {
            this.requestResult = "manage-product.manage-product-response-error-add";
            this.isRequestError = true;
            setTimeout(() => {
              this.requestResult = "";
            }, 5000);
          }
        );
      }
    }
  }
}
