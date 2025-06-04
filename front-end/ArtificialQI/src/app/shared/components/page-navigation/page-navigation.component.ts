import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-page-navigation',
  standalone:true,
  imports: [NzPaginationModule],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.css',
})
export class PageNavigationComponent  {
  @Input() totalItems = 0;// deve ricevere dal componente padre questi input
  @Input() pageSize = 5;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(pageIndex: number): void {
    this.pageChange.emit(pageIndex);
  }
}

