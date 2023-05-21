import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@shared/models/product/category';
import {Nullable} from "@core/models/nullable";

@Component({
  selector: 'app-catalog-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input('categories')
  categories$!: Observable<Nullable<Category[]>>;

  @Input()
  activeCategory: Nullable<Category>;

  @Output()
  categorySelected = new EventEmitter();

  constructor() {}

  selectCategory(category: Category): void {
    if (category.id !== this.activeCategory?.id) {
      this.activeCategory = category;
    }

    this.categorySelected.emit(category);
  }
}
