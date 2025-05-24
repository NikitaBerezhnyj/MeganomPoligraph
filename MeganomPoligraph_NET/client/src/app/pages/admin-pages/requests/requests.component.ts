import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StatisticsService } from "../../../services/statistics/statistics.service";
import { TranslateModule, TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { TranslationService } from "../../../services/translation/translation.service";
import { AdminsService } from "../../../services/admins/admins.service";
import { Subscription } from "rxjs";
import { checkUserId } from "../../../utils/checkUserId";

@Component({
  selector: "app-requests",
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"]
})
export class RequestsComponent implements OnInit, OnDestroy {
  requests: any[] = [];
  isDetailsModalOpen = false;
  selectedRequest: any = null;
  sortOrder: string = "desc";
  selectedStatus: string = "New";
  showOnlyNew: boolean = false;
  showOnlyMy: boolean = false;
  private langChangeSub!: Subscription;
  private originalRequests: any[] = [];

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService,
    private adminsService: AdminsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadRequests();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.remapRequestsWithNewLanguage();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadRequests(): void {
    this.statisticsService.getAllRequests().subscribe(
      (data: any) => {
        this.originalRequests = [...data];
        this.mapAndSetRequests(data);
      },
      (error: any) => {
        console.error("Error loading requests", error);
      }
    );
  }

  async remapRequestsWithNewLanguage(): Promise<void> {
    if (this.originalRequests.length > 0) {
      await this.mapAndSetRequests(this.originalRequests);
    }
  }

  async mapAndSetRequests(data: any[]): Promise<void> {
    const mappedRequests = [];
    for (const request of data) {
      const mappedRequest = await this.mapRequestFields(request);
      mappedRequests.push(mappedRequest);
    }

    this.requests = mappedRequests;
    this.sortRequests();
  }

  async mapRequestFields(request: any): Promise<any> {
    const translationKeys = [];

    if (request.type && request.type !== "custom") {
      translationKeys.push(`requests.requests-type-options.${request.type}`);
    }

    if (request.material && request.material !== "custom") {
      translationKeys.push(`requests.requests-material-options.${request.material}`);
    }

    if (request.print && request.print !== "custom") {
      translationKeys.push(`requests.requests-print-options.${request.print}`);
    }

    if (request.embossing && request.embossing !== "custom") {
      translationKeys.push(`requests.requests-embossing-options.${request.embossing}`);
    }

    if (request.handles && request.handles !== "custom") {
      translationKeys.push(`requests.requests-handles-options.${request.handles}`);
    }

    request.status = request.status || "New";
    request.assignedAdmin = request.assignedAdmin || null;

    translationKeys.push(`requests.requests-not-specified`);
    translationKeys.push(`requests.requests-custom-value`);
    translationKeys.push(`requests.requests-not-selected`);

    let translations: Record<string, string> = {};
    if (translationKeys.length > 0) {
      translations = await this.translationService.translateMultipleKeys(translationKeys);
    }

    return {
      ...request,
      id: request.requestID,
      phone:
        request.phone === null
          ? translations[`requests.requests-not-specified`] || "Not specified"
          : request.phone,
      email:
        request.email === null
          ? translations[`requests.requests-not-specified`] || "Not specified"
          : request.email,
      type:
        request.type === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.type === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : translations[`requests.requests-type-options.${request.type}`] || request.type,
      size:
        request.size === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.size === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : request.size,
      material:
        request.material === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.material === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : translations[`requests.requests-material-options.${request.material}`] ||
              request.material,
      print:
        request.print === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.print === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : translations[`requests.requests-print-options.${request.print}`] || request.print,
      embossing:
        request.embossing === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.embossing === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : translations[`requests.requests-embossing-options.${request.embossing}`] ||
              request.embossing,
      handles:
        request.handles === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.handles === "custom"
            ? translations[`requests.requests-custom-value`] || "Custom value"
            : translations[`requests.requests-handles-options.${request.handles}`] ||
              request.handles,
      circulation:
        request.circulation === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.circulation,
      notes:
        request.notes === null
          ? translations[`requests.requests-not-selected`] || "Not selected"
          : request.notes,
      status: request.status,
      assignedAdmin: request.assignedAdmin
    };
  }

  sortRequests(): void {
    this.requests.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  onSortOrderChange(event: any): void {
    this.sortOrder = event.target.value;
    this.sortRequests();
  }

  onShowOnlyNewChange(): void {
    this.showOnlyMy = false;
    if (this.showOnlyNew) {
      this.requests = this.originalRequests.filter(request => request.status === "New");
    } else {
      this.requests = [...this.originalRequests];
    }

    this.sortRequests();
  }

  onShowOnlyMyChange(): void {
    this.showOnlyNew = false;
    const userId = checkUserId();

    if (this.showOnlyMy) {
      if (userId && userId.toString().trim() !== "null") {
        const userIdStr = userId.toString().trim();
        this.requests = this.originalRequests.filter(
          request =>
            request.assignedAdminId && request.assignedAdminId.toString().trim() === userIdStr
        );
      } else {
        this.requests = [];
      }
    } else {
      this.requests = [...this.originalRequests];
    }

    this.sortRequests();
  }

  updateRequestStatus(requestId: number, status: string): void {
    this.adminsService.updateRequestStatus(requestId, status).subscribe(
      () => {
        return;
      },
      (error: any) => {
        console.error("Error updating status", error);
      }
    );
  }

  openRequestDetails(request: any): void {
    this.selectedRequest = request;
    this.isDetailsModalOpen = true;
  }

  closeModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedRequest = null;
  }
}
