import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '@shared/models/product/subcategory';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input('subcategories')
  subcategories$: Observable<Subcategory[]>;

  @Input()
  activeSubcategoryId: number;

  @Output()
  filterChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
