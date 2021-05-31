import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealBannerComponent } from './deal-banner.component';

describe('DealBannerComponent', () => {
  let component: DealBannerComponent;
  let fixture: ComponentFixture<DealBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
