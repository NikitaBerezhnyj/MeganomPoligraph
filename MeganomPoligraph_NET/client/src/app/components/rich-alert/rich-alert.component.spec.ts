import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RichAlertComponent } from "./rich-alert.component";

describe("RichAlertComponent", () => {
  let component: RichAlertComponent;
  let fixture: ComponentFixture<RichAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichAlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RichAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
