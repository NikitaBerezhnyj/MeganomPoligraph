import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-image-modal",
  imports: [CommonModule],
  templateUrl: "./image-modal.component.html",
  styleUrls: ["./image-modal.component.css"]
})
export class ImageModalComponent {
  @Input() imageUrl: string = "";
  @Output() closeModal = new EventEmitter<void>();

  close(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  closeOnCross(event: MouseEvent) {
    event.stopPropagation();
    this.closeModal.emit();
  }
}
