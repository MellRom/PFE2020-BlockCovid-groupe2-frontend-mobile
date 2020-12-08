import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidComponent } from './covid.component';

describe('ErrorComponent', () => {
  
  let component: CovidComponent;
  let fixture: ComponentFixture<CovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
