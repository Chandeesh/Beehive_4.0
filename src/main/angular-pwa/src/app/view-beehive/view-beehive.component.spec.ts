import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeehiveComponent } from './view-beehive.component';

describe('ViewBeehiveComponent', () => {
  let component: ViewBeehiveComponent;
  let fixture: ComponentFixture<ViewBeehiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBeehiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBeehiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
