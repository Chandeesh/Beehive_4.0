import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeehiveWeightComponent } from './beehive-weight.component';

describe('BeehiveWeightComponent', () => {
  let component: BeehiveWeightComponent;
  let fixture: ComponentFixture<BeehiveWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeehiveWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeehiveWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
