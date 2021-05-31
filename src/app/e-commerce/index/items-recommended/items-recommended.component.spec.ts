import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsRecommendedComponent } from './items-recommended.component';

describe('ItemsRecommendedComponent', () => {
  let component: ItemsRecommendedComponent;
  let fixture: ComponentFixture<ItemsRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsRecommendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
