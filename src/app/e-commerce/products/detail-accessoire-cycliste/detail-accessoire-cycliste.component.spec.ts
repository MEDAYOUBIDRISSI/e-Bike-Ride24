import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccessoireCyclisteComponent } from './detail-accessoire-cycliste.component';

describe('DetailAccessoireCyclisteComponent', () => {
  let component: DetailAccessoireCyclisteComponent;
  let fixture: ComponentFixture<DetailAccessoireCyclisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAccessoireCyclisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAccessoireCyclisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
