import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBicycletteByParamsComponent } from './list-bicyclette-by-params.component';

describe('ListBicycletteByParamsComponent', () => {
  let component: ListBicycletteByParamsComponent;
  let fixture: ComponentFixture<ListBicycletteByParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBicycletteByParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBicycletteByParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
