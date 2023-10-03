import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumesDashComponent } from './perfumes-dash.component';

describe('PerfumesDashComponent', () => {
  let component: PerfumesDashComponent;
  let fixture: ComponentFixture<PerfumesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfumesDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
