import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualSliderComponent } from './virtual-slider.component';

describe('VirtualSliderComponent', () => {
  let component: VirtualSliderComponent;
  let fixture: ComponentFixture<VirtualSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
