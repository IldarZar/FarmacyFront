import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nullable } from '@core/models/nullable';
import { MenuItem } from "@shared/models/menu-item";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.html',
  styleUrls: ['./menu-list.scss'],
})

export class MenuList<T extends MenuItem> {
  @Input('items')
  items$: Nullable<T[]>;

  @Input()
  activeItem: Nullable<T>;

  @Input()
  isSelectImportant: boolean = true;

  @Output()
  itemSelected = new EventEmitter();

  constructor() {}

  selectItem(subcategory: T): void {
    if (subcategory.id === this.activeItem?.id && !this.isSelectImportant) {
      this.activeItem = null;
      this.itemSelected.emit(this.activeItem);
      return;
    }

    this.activeItem = subcategory;
    this.itemSelected.emit(subcategory);
  }
}
