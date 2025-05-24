import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { checkUserId } from "../../../utils/checkUserId";
import { ProductService } from "../../../services/product/product.service";
import { RichAlertService } from "../../../services/rich-alert/rich-alert.service";
import { TranslationService } from "../../../services/translation/translation.service";
import { ImageModalComponent } from "../../../components/image-modal/image-modal.component";

@Component({
  selector: "app-products",
  imports: [CommonModule, FormsModule, TranslateModule, ImageModalComponent],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isModalOpen = false;
  newProduct = { name: "", description: "", price: 0 };
  isDeleteModalOpen = false;
  deletedProductId: string = "";
  modalImageUrl: string = "";
  sortOption: string = "newest";
  categoryTranslations: Record<string, string> = {};
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private productService: ProductService,
    private translationService: TranslationService,
    private richAlertService: RichAlertService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.sortProducts();
        this.translateCategories();
      },
      (error: any) => {
        console.error("Error loading products", error);
      }
    );
  }

  translateCategories(): void {
    const categoryKeys = this.products.map(product => product.productCategories);

    const modifyCategoryKeys = categoryKeys.flatMap(categories =>
      categories.map((category: string) => `products.products-categories-list.${category}`)
    );

    this.translationService.translateMultipleKeys(modifyCategoryKeys).then(translations => {
      this.categoryTranslations = translations;
    });
  }

  cleanHtmlDescription(description: string): string {
    let cleanedDescription = description
      .replace(/<h5[^>]*>/g, "")
      .replace(/<\/h5>/g, ".")
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "")
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, ".")
      .replace(/([.!?])\s*(?=[A-Za-zА-Яа-я])/g, "$1 ")
      .replace(/\n/g, "")
      .replace(/\s+/g, " ");

    if (!cleanedDescription.endsWith(".")) {
      cleanedDescription += ".";
    }

    cleanedDescription = cleanedDescription.replace(/\.{2,}/g, ".");

    return cleanedDescription.trim();
  }

  getCleanedDescription(description: string): string {
    return this.cleanHtmlDescription(description);
  }

  sortProducts(): void {
    this.products.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.sortProducts();
  }

  showModal(imageUrl: string) {
    this.modalImageUrl = imageUrl;
  }

  closeModal() {
    this.modalImageUrl = "";
  }

  openCreatePage(): void {
    this.router.navigate(["/admin/products/manage"]);
  }

  async openEditPage(productId: string): Promise<void> {
    const adminId = checkUserId();

    try {
      await this.productService.lockProduct(parseInt(productId, 10), adminId).toPromise();
      this.router.navigate(["/admin/products/manage", productId]);
    } catch (error) {
      const errorMessage: string = await this.translationService.translateKeyAsync(
        "products.products-error-lock"
      );
      this.richAlertService.show({ message: errorMessage });
    }
  }

  openDeleteModal(productId: string): void {
    this.isDeleteModalOpen = true;
    this.deletedProductId = productId;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(Number(productId)).subscribe(
      () => {
        this.loadProducts();
        this.closeDeleteModal();
      },
      error => {
        console.error("Error deleting product with ID:", productId, error);
      }
    );
  }

  private subscribeToLanguageChanges(): void {
    this.langChangeSubscription = this.translationService.translateService.onLangChange.subscribe(
      () => {
        this.translateCategories();
      }
    );
  }
}
