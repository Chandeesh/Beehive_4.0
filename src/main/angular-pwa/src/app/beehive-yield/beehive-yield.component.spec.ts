import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeehiveYieldComponent } from './beehive-yield.component';

describe('BeehiveYieldComponent', () => {
  let component: BeehiveYieldComponent;
  let fixture: ComponentFixture<BeehiveYieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeehiveYieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeehiveYieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
