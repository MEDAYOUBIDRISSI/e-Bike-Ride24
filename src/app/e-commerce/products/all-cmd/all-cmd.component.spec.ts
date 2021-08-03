import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCmdComponent } from './all-cmd.component';

describe('AllCmdComponent', () => {
  let component: AllCmdComponent;
  let fixture: ComponentFixture<AllCmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
