import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCommandeComponent } from './print-commande.component';

describe('PrintCommandeComponent', () => {
  let component: PrintCommandeComponent;
  let fixture: ComponentFixture<PrintCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
