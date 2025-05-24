import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgxChartsModule, Color, ScaleType } from "@swimlane/ngx-charts";
import { TranslateModule, TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { StatisticsService } from "../../../services/statistics/statistics.service";
import { TranslationService } from "../../../services/translation/translation.service";

@Component({
  selector: "app-analytics",
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, NgxChartsModule],
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  data: { name: string; value: number }[] = [];
  colorScheme: Color = {
    name: "custom",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#2498ee", "#0a2941"]
  };
  view = [400, 400];

  totalUsers: number = 0;
  newUsers: number = 0;
  totalRequests: number = 0;
  selectedPeriod: string = "all";

  allUsersName: string = "";
  newUsersName: string = "";

  private langChangeSub!: Subscription;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.fetchStatistics(this.selectedPeriod);

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTranslations();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadTranslations(): void {
    this.translationService
      .translateMultipleKeys([
        "analytics.analytics-diagram-all-users",
        "analytics.analytics-diagram-new-users"
      ])
      .then(translations => {
        this.allUsersName = translations["analytics.analytics-diagram-all-users"];
        this.newUsersName = translations["analytics.analytics-diagram-new-users"];
        this.updateChartData();
      });
  }

  fetchStatistics(period: string): void {
    this.statisticsService.getStatisticsData(period).subscribe({
      next: response => {
        this.totalUsers = response.totalUsers || 0;
        this.newUsers = response.uniqueUsers || 0;
        this.totalRequests = response.totalRequests || 0;

        this.updateChartData();
      },
      error: err => {
        console.error("Error fetching statistics:", err);
      }
    });
  }

  updateChartData(): void {
    this.data = [
      { name: this.allUsersName, value: this.totalUsers },
      { name: this.newUsersName, value: this.newUsers }
    ];
  }

  onPeriodChange(): void {
    this.fetchStatistics(this.selectedPeriod);
  }
}
