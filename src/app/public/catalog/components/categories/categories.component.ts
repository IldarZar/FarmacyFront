import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogService} from "../../services/catalog.service";
import {Observable} from "rxjs";
import {Category} from "../../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input('categories')
  categories$!: Observable<Category[]>;

  @Input()
  activeCategoryId: number | null;

  @Output()
  categorySelected = new EventEmitter();

  constructor() { }

  selectCategory(categoryId: number): void {

    if (categoryId === this.activeCategoryId) {
      this.activeCategoryId = null;
      this.categorySelected.emit(this.activeCategoryId);
      return;
    }

    this.activeCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }
}
