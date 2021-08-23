import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchePageComponent } from './searche-page.component';

describe('SearchePageComponent', () => {
  let component: SearchePageComponent;
  let fixture: ComponentFixture<SearchePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
