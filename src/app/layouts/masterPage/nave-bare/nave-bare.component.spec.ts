import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaveBareComponent } from './nave-bare.component';

describe('NaveBareComponent', () => {
  let component: NaveBareComponent;
  let fixture: ComponentFixture<NaveBareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaveBareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaveBareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
