import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDashComponent } from './about-dash.component';

describe('AboutDashComponent', () => {
  let component: AboutDashComponent;
  let fixture: ComponentFixture<AboutDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
