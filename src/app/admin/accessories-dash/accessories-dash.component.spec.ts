import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesDashComponent } from './accessories-dash.component';

describe('AccessoriesDashComponent', () => {
  let component: AccessoriesDashComponent;
  let fixture: ComponentFixture<AccessoriesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoriesDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoriesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
