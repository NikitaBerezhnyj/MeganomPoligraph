import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-rich-alert",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./rich-alert.component.html",
  styleUrls: ["./rich-alert.component.css"],
  animations: [
    trigger("alertAnimation", [
      state(
        "void",
        style({
          transform: "translateY(-20px)",
          opacity: 0
        })
      ),
      state(
        "enter",
        style({
          transform: "translateY(0)",
          opacity: 1
        })
      ),
      state(
        "leave",
        style({
          transform: "translateY(20px)",
          opacity: 0
        })
      ),
      transition("void => enter", animate("200ms ease-out")),
      transition("enter => leave", animate("200ms ease-in"))
    ])
  ]
})
export class RichAlertComponent implements OnInit, OnDestroy {
  @Input() type: "success" | "error" | "warning" | "info" | "primary" = "info";
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() confirmText: string = "OK";
  @Input() cancelText: string = "Cancel";
  @Input() showConfirmButton: boolean = true;
  @Input() showCancelButton: boolean = false;
  @Input() showCloseButton: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() autoClose: boolean = false;
  @Input() autoCloseDelay: number = 5000;
  @Input() overlay: boolean = true;
  @Input() closeOnOverlayClick: boolean = false;
  @Input() translateTitle: boolean = false;
  @Input() translateMessage: boolean = false;
  @Input() translateConfirmText: boolean = false;
  @Input() translateCancelText: boolean = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  isVisible: boolean = false;
  showButtons: boolean = true;
  animationState: string = "void";
  private autoCloseTimeout: any;

  get iconClass(): string {
    switch (this.type) {
      case "success":
        return "fa fa-check-circle";
      case "error":
        return "fa fa-times-circle";
      case "warning":
        return "fa fa-exclamation-triangle";
      case "info":
        return "fa fa-info-circle";
      case "primary":
        return "fa fa-bell";
      default:
        return "fa fa-info-circle";
    }
  }

  ngOnInit(): void {
    this.showButtons = this.showConfirmButton || this.showCancelButton;
  }

  ngOnDestroy(): void {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }

  show(): void {
    this.isVisible = true;
    this.animationState = "enter";

    if (this.autoClose) {
      this.autoCloseTimeout = setTimeout(() => {
        this.close();
      }, this.autoCloseDelay);
    }
  }

  hide(): void {
    this.animationState = "leave";
    setTimeout(() => {
      this.isVisible = false;
    }, 200);
  }

  confirm(): void {
    this.onConfirm.emit();
    this.hide();
  }

  cancel(): void {
    this.onCancel.emit();
    this.hide();
  }

  close(): void {
    this.onClose.emit();
    this.hide();
  }

  overlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  static showAlert(options: {
    message: string;
    type?: "success" | "error" | "warning" | "info" | "primary";
    title?: string;
    confirmCallback?: () => void;
    autoClose?: boolean;
    translateMessage?: boolean;
  }): RichAlertComponent {
    return null as any;
  }
}
