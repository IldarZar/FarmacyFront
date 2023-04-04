import { Component, OnInit } from '@angular/core';
import {CatalogService} from "@app/public/catalog/services/catalog.service";
import {Observable} from "rxjs";
import {Product} from "@app/public/catalog/models/product";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
  ) { }

  products$?: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.catalogService.getCatalog();
  }

}
