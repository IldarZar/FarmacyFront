import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-count-select',
  templateUrl: './count-select.component.html',
  styleUrls: ['./count-select.component.scss']
})
export class CountSelectComponent implements OnInit {
  @Input()
  value: number;

  @Output()
  valueChanges = new EventEmitter<number>;

  input: HTMLInputElement;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.input = this.elementRef.nativeElement.querySelector('input');
  }
  stepUp(): void {
    this.input.stepUp();
    this.value = this.input.valueAsNumber;
    this.valueChanges.emit(this.value);
  }

  stepDown(): void {
    this.input.stepDown();
    this.value = this.input.valueAsNumber;
    this.valueChanges.emit(this.value);
  }
}
