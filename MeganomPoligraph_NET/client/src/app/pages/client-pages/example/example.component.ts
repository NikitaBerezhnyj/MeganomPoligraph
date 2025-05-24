import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ProductService } from "../../../services/product/product.service";
import { ImageModalComponent } from "../../../components/image-modal/image-modal.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-example",
  imports: [CommonModule, TranslateModule, RouterLink, ImageModalComponent],
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.css"]
})
export class ExampleComponent implements OnInit {
  products: any[] = [];
  filteredItems: any[] = [];
  category: string = "";
  currentHeader: string = "";
  currentDescription: string = "";
  modalImageUrl: string = "";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get("category") || "";

      this.currentHeader = this.translate.instant(
        this.category ? `example.example-${this.category}-header` : "example.example-header"
      );
      this.currentDescription = this.translate.instant(
        this.category
          ? `example.example-${this.category}-description`
          : "example.example-description"
      );
      this.fetchProducts();
    });
  }

  fetchProducts() {
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe(
        data => {
          this.products = data;
          this.filteredItems = this.products;
          this.cdr.detectChanges();
        },
        error => {
          console.error("Error fetching products by category:", error);
        }
      );
    } else {
      this.productService.getAllProducts().subscribe(
        data => {
          this.products = data;
          this.filteredItems = this.products;
          this.cdr.detectChanges();
        },
        error => {
          console.error("Error fetching all products:", error);
        }
      );
    }
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }

  showModal(imageUrl: string) {
    this.modalImageUrl = imageUrl;
  }

  closeModal() {
    this.modalImageUrl = "";
  }
}
