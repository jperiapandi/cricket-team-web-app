import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFullErrorComponent } from './team-full-error.component';

describe('TeamFullErrorComponent', () => {
  let component: TeamFullErrorComponent;
  let fixture: ComponentFixture<TeamFullErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFullErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamFullErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
