import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAListViewComponent } from './qalist-view.component';

describe('QAListViewComponent', () => {
  let component: QAListViewComponent;
  let fixture: ComponentFixture<QAListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QAListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QAListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
