import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { Subcategory } from '@shared/models/product/subcategory';
import { Nullable } from '@core/models/nullable';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { CatalogService } from '@core/services/catalog.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.html',
  styleUrls: ['./catalog-menu.scss'],
})
export class CatalogMenu implements OnInit {
  @Input('subcategories')
  subcategories: Nullable<Subcategory[]>;

  @Input()
  activeSubcategory: Nullable<Subcategory>;

  @Output()
  filterChanged = new EventEmitter();

  minPrice: number = 0;
  maxPrice: number = 20000;

  options: Options = {
    floor: 0,
    boundPointerLabels: true,
    ceil: 20000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>От</b> ${value}₽`;
        case LabelType.High:
          return `<b>До</b> ${value}₽`;
        default:
          return '₽' + value;
      }
    },
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

  subcategorySelected(subCategory: Subcategory): void {
    const filter = {
      ...this.filter.value,
      subCategoryId: subCategory.id,
    };

    this.filterChanged.emit(filter);
  }

  priceChanged(value: number, type: string) {
    this.filter.next({ ...this.filter.value, [type]: value });
  }
}
