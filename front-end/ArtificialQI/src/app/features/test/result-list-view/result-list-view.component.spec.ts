import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListViewComponent } from './result-list-view.component';

describe('ResultListViewComponent', () => {
  let component: ResultListViewComponent;
  let fixture: ComponentFixture<ResultListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
