import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaItemsComponent } from './rutina-items.component';

describe('RutinaItemsComponent', () => {
  let component: RutinaItemsComponent;
  let fixture: ComponentFixture<RutinaItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
