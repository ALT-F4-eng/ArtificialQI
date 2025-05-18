import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAElementComponent } from './qaelement.component';

describe('QAElementComponent', () => {
  let component: QAElementComponent;
  let fixture: ComponentFixture<QAElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QAElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QAElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
