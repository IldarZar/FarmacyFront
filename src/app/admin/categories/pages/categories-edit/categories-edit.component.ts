import {Component, Input, OnInit} from '@angular/core';
import {Category} from "@app/public/catalog/models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-categories-edit[category]',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  @Input()
  category!: Category;

  categoryFormGroup = new FormGroup({
    custom: new FormControl(''),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(categories => categories[0]))
      .subscribe(category => {
        this.categoryFormGroup.patchValue({ custom: category.name });
      });
  }

  closeWindow() {
    this.router.navigate(['/categories']);
  }

}
