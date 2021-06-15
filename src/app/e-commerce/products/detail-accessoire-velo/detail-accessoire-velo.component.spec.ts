import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccessoireVeloComponent } from './detail-accessoire-velo.component';

describe('DetailAccessoireVeloComponent', () => {
  let component: DetailAccessoireVeloComponent;
  let fixture: ComponentFixture<DetailAccessoireVeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAccessoireVeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAccessoireVeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
