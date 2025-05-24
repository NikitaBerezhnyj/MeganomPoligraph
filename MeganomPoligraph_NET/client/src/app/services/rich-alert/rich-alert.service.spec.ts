import { TestBed } from "@angular/core/testing";

import { RichAlertService } from "./rich-alert.service";

describe("RichAlertService", () => {
  let service: RichAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichAlertService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
