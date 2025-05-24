import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ClientService } from "./services/client/client.service";
import { Router } from "@angular/router";
import { PLATFORM_ID } from "@angular/core";
import { of } from "rxjs";

const mockClientService = {
  getIPAddress: () => of({ ip: "127.0.0.1" }),
  trackVisit: () => of(null)
};

const mockRouter = {
  url: "/"
};

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ClientService, useValue: mockClientService },
        { provide: Router, useValue: mockRouter },
        { provide: PLATFORM_ID, useValue: "browser" }
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
