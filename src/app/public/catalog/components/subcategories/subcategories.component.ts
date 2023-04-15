import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CatalogService} from "../../services/catalog.service";
import {Observable} from "rxjs";
import {Subcategory} from "../../models/Subcategory";

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {

  subcategories$!: Observable<Subcategory[]>;

  selectedSubcategoryId!: null | number;

  @Output()
  subcategorySelected = new EventEmitter();

  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit(): void {
    this.subcategories$ = this.catalogService.getSubcategories();
  }

  selectSubcategory(categoryId: number): void {
    this.selectedSubcategoryId = this.selectedSubcategoryId === categoryId ? null : categoryId;

    this.subcategorySelected.emit(this.selectedSubcategoryId);
  }
}
