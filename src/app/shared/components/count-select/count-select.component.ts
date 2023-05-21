import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-count-select',
  templateUrl: './count-select.component.html',
  styleUrls: ['./count-select.component.scss']
})
export class CountSelectComponent implements OnInit {
  @Input()
  @Output()
  value: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
