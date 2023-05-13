import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dictionary } from '@app/core/models/dictionary';
import { Nullable } from '@core/models/nullable';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent<T extends number | string> {
  @Input('items')
  items$: Nullable<Dictionary<T>[]>;

  @Input()
  activeItemId: T | null;

  @Input()
  isSelectImportant: boolean = false;

  @Output()
  itemSelected = new EventEmitter();

  constructor() {}

  selectItem(subcategoryId: T): void {
    if (subcategoryId === this.activeItemId && !this.isSelectImportant) {
      this.activeItemId = null;
      this.itemSelected.emit(this.activeItemId);
      return;
    }

    this.activeItemId = subcategoryId;
    this.itemSelected.emit(subcategoryId);
  }
}
