import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPlayerComponent } from './selected-player.component';

describe('SelectedPlayerComponent', () => {
  let component: SelectedPlayerComponent;
  let fixture: ComponentFixture<SelectedPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
