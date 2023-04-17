import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogService} from "../../services/catalog.service";
import {Observable} from "rxjs";
import {Subcategory} from "../../../../shared/models/product/subcategory";
import {Category} from "../../../../shared/models/product/category";

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent {

  @Input('subcategories')
  subcategories$!: Observable<Subcategory[]>;

  @Input()
  activeSubcategoryId: number | null;

  @Output()
  subcategorySelected = new EventEmitter();

  constructor() { }

  selectSubcategory(subcategoryId: number): void {

    if (subcategoryId === this.activeSubcategoryId) {
      this.activeSubcategoryId = null;
      this.subcategorySelected.emit(this.activeSubcategoryId);
      return;
    }

    this.activeSubcategoryId = subcategoryId;
    this.subcategorySelected.emit(subcategoryId);
  }
}
