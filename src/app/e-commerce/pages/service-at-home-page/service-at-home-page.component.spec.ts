import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAtHomePageComponent } from './service-at-home-page.component';

describe('ServiceAtHomePageComponent', () => {
  let component: ServiceAtHomePageComponent;
  let fixture: ComponentFixture<ServiceAtHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAtHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAtHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
