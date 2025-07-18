import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkExistsErrorComponent } from './wk-exists-error.component';

describe('WkExistsErrorComponent', () => {
  let component: WkExistsErrorComponent;
  let fixture: ComponentFixture<WkExistsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WkExistsErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WkExistsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
