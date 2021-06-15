import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBicycletteComponent } from './detail-bicyclette.component';

describe('DetailBicycletteComponent', () => {
  let component: DetailBicycletteComponent;
  let fixture: ComponentFixture<DetailBicycletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBicycletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBicycletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
