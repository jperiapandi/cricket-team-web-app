import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkNeedErrorComponent } from './wk-need-error.component';

describe('WkNeedErrorComponent', () => {
  let component: WkNeedErrorComponent;
  let fixture: ComponentFixture<WkNeedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WkNeedErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WkNeedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
