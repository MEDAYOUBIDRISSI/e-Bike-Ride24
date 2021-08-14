import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccessoireByParamsComponent } from './list-accessoire-by-params.component';

describe('ListAccessoireByParamsComponent', () => {
  let component: ListAccessoireByParamsComponent;
  let fixture: ComponentFixture<ListAccessoireByParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccessoireByParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccessoireByParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
