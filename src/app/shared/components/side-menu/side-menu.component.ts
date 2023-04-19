import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Dictionary } from '@app/core/models/dictionary';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  @Input('items')
  items$!: Observable<Dictionary[]>;

  @Input()
  activeItemId: number | null;

  @Output()
  itemSelected = new EventEmitter();

  constructor() {}

  selectItem(subcategoryId: number): void {
    if (subcategoryId === this.activeItemId) {
      this.activeItemId = null;
      this.itemSelected.emit(this.activeItemId);
      return;
    }

    this.activeItemId = subcategoryId;
    this.itemSelected.emit(subcategoryId);
  }
}
