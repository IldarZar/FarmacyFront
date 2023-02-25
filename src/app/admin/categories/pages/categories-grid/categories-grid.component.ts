import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryAdminService} from "@app/admin/categories/services/category-admin.service";
import {Category} from "@app/public/catalog/models/category";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryAdminService: CategoryAdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.categoryAdminService.getCategories().subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.sort = this.sort;
    });
  }

  // createCategory() {
  //   this.categoryAdminService.addCategories().subscribe().unsubscribe();
  //   this.categoryAdminService.getCategories().subscribe(categories => this.dataSource = new MatTableDataSource(categories));
  // }

  editCategory(e: any) {
    this.router.navigate(['edit', e.id], {relativeTo: this.route});
  }

  announceSortChange(e: any) {
    console.log(e);
  }

}
