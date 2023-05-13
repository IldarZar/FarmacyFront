import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { Subcategory } from '@shared/models/product/subcategory';
import { Nullable } from '@core/models/nullable';
import { Options } from '@angular-slider/ngx-slider';
import { CatalogService } from '@core/services/catalog.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input('subcategories')
  subcategories: Nullable<Subcategory[]>;

  @Input()
  activeSubcategoryId: Nullable<number>;

  @Output()
  filterChanged = new EventEmitter();

  minPrice: number = 0;
  maxPrice: number = 5000;

  options: Options = {
    floor: 0,
    ceil: 5000,
  };

  filter = new BehaviorSubject({
    minPrice: 1,
    maxPrice: this.maxPrice,
    subCategoryId: null,
  });

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.filter.pipe(skip(1), debounceTime(1000)).subscribe((filter) => {
      this.filterChanged.emit(filter);
    });
  }

  subcategorySelected(subCategoryId: Nullable<number>): void {
    const filter = {
      ...this.filter.value,
      subCategoryId,
    };

    this.filterChanged.emit(filter);
  }

  priceChanged(value: number, type: string) {
    this.filter.next({ ...this.filter.value, [type]: value });

    // this.filterChanged.emit(filter);
  }
}
