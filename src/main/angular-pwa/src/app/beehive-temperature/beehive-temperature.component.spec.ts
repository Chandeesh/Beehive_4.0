import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeehiveTemperatureComponent } from './beehive-temperature.component';

describe('BeehiveTemperatureComponent', () => {
  let component: BeehiveTemperatureComponent;
  let fixture: ComponentFixture<BeehiveTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeehiveTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeehiveTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
