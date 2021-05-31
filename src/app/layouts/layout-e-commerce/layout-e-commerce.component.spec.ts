import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutECommerceComponent } from './layout-e-commerce.component';

describe('LayoutECommerceComponent', () => {
  let component: LayoutECommerceComponent;
  let fixture: ComponentFixture<LayoutECommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutECommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutECommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
