import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dictionary } from '@core/models/dictionary';
import { Nullable } from '@core/models/nullable';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent<T extends number | string> {
  @Input()
  items: Nullable<Dictionary<T>[]>;

  @Input()
  activeItem: Nullable<Dictionary<T>>;

  @Output()
  activeItemChanges = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  select(item: Dictionary<T>) {
    this.activeItem = item;
    this.activeItemChanges.emit(item);
  }
}
