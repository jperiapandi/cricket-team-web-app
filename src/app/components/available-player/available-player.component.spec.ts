import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePlayerComponent } from './available-player.component';

describe('AvailablePlayerComponent', () => {
  let component: AvailablePlayerComponent;
  let fixture: ComponentFixture<AvailablePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailablePlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
