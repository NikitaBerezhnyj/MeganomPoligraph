import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  createComponent,
  EnvironmentInjector
} from "@angular/core";
import { RichAlertComponent } from "../../components/rich-alert/rich-alert.component";

@Injectable({
  providedIn: "root"
})
export class RichAlertService {
  private activeAlerts: ComponentRef<RichAlertComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(options: {
    message: string;
    type?: "success" | "error" | "warning" | "info" | "primary";
    title?: string;
    confirmText?: string;
    cancelText?: string;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    showCloseButton?: boolean;
    showIcon?: boolean;
    autoClose?: boolean;
    autoCloseDelay?: number;
    overlay?: boolean;
    closeOnOverlayClick?: boolean;
    translateTitle?: boolean;
    translateMessage?: boolean;
    translateConfirmText?: boolean;
    translateCancelText?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
  }): RichAlertComponent {
    const alertWrapper = document.createElement("div");
    document.body.appendChild(alertWrapper);

    const alertComponentRef = createComponent(RichAlertComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: alertWrapper
    });

    const alertInstance = alertComponentRef.instance;
    Object.assign(alertInstance, {
      type: options.type || "info",
      title: options.title || "",
      message: options.message || "",
      confirmText: options.confirmText || "OK",
      cancelText: options.cancelText || "Cancel",
      showConfirmButton: options.showConfirmButton !== undefined ? options.showConfirmButton : true,
      showCancelButton: options.showCancelButton !== undefined ? options.showCancelButton : false,
      showCloseButton: options.showCloseButton !== undefined ? options.showCloseButton : false,
      showIcon: options.showIcon !== undefined ? options.showIcon : true,
      autoClose: options.autoClose !== undefined ? options.autoClose : false,
      autoCloseDelay: options.autoCloseDelay || 5000,
      overlay: options.overlay !== undefined ? options.overlay : true,
      closeOnOverlayClick:
        options.closeOnOverlayClick !== undefined ? options.closeOnOverlayClick : false,
      translateTitle: options.translateTitle !== undefined ? options.translateTitle : false,
      translateMessage: options.translateMessage !== undefined ? options.translateMessage : false,
      translateConfirmText:
        options.translateConfirmText !== undefined ? options.translateConfirmText : false,
      translateCancelText:
        options.translateCancelText !== undefined ? options.translateCancelText : false
    });

    if (options.onConfirm) {
      alertInstance.onConfirm.subscribe(() => {
        options.onConfirm!();
        this.destroyAlert(alertComponentRef);
      });
    } else {
      alertInstance.onConfirm.subscribe(() => {
        this.destroyAlert(alertComponentRef);
      });
    }

    if (options.onCancel) {
      alertInstance.onCancel.subscribe(() => {
        options.onCancel!();
        this.destroyAlert(alertComponentRef);
      });
    } else {
      alertInstance.onCancel.subscribe(() => {
        this.destroyAlert(alertComponentRef);
      });
    }

    if (options.onClose) {
      alertInstance.onClose.subscribe(() => {
        options.onClose!();
        this.destroyAlert(alertComponentRef);
      });
    } else {
      alertInstance.onClose.subscribe(() => {
        this.destroyAlert(alertComponentRef);
      });
    }

    this.activeAlerts.push(alertComponentRef);

    alertInstance.show();

    this.appRef.attachView(alertComponentRef.hostView);

    return alertInstance;
  }

  success(message: string, options: any = {}): RichAlertComponent {
    return this.show({
      ...options,
      message,
      type: "success"
    });
  }

  error(message: string, options: any = {}): RichAlertComponent {
    return this.show({
      ...options,
      message,
      type: "error"
    });
  }

  warning(message: string, options: any = {}): RichAlertComponent {
    return this.show({
      ...options,
      message,
      type: "warning"
    });
  }

  info(message: string, options: any = {}): RichAlertComponent {
    return this.show({
      ...options,
      message,
      type: "info"
    });
  }

  confirm(message: string, options: any = {}): Promise<boolean> {
    return new Promise(resolve => {
      this.show({
        message,
        title: options.title || "Confirmation",
        type: options.type || "primary",
        showConfirmButton: true,
        showCancelButton: true,
        confirmText: options.confirmText || "Yes",
        cancelText: options.cancelText || "No",
        translateTitle: options.translateTitle || false,
        translateMessage: options.translateMessage || false,
        translateConfirmText: options.translateConfirmText || false,
        translateCancelText: options.translateCancelText || false,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
        onClose: () => resolve(false)
      });
    });
  }

  notify(message: string, options: any = {}): RichAlertComponent {
    return this.show({
      message,
      type: options.type || "info",
      autoClose: true,
      autoCloseDelay: options.autoCloseDelay || 3000,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: options.showCloseButton !== undefined ? options.showCloseButton : true,
      translateMessage: options.translateMessage || false,
      ...options
    });
  }

  private destroyAlert(alertRef: ComponentRef<RichAlertComponent>): void {
    const index = this.activeAlerts.indexOf(alertRef);
    if (index > -1) {
      this.activeAlerts.splice(index, 1);
    }

    alertRef.hostView.destroy();
    if (alertRef.location.nativeElement.parentNode) {
      alertRef.location.nativeElement.parentNode.remove();
    }
  }

  closeAll(): void {
    [...this.activeAlerts].forEach(alertRef => {
      alertRef.instance.close();
    });
  }
}
