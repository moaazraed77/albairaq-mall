import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDashComponent } from './services-dash.component';

describe('ServicesDashComponent', () => {
  let component: ServicesDashComponent;
  let fixture: ComponentFixture<ServicesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
