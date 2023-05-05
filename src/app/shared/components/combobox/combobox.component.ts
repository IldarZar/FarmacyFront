import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {Nullable} from "@core/models/nullable";

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})

export class ComboboxComponent<T extends { [key: string]: any } > implements  AfterViewInit {
  @Input()
  data: Nullable<T[]>;
  @Input()
  value: Nullable<T>;
  @Output()
  valueChanges = new EventEmitter();

  @Input()
  textField: keyof T = 'name';
  @Input()
  valueField: keyof T = 'id';
  @Input()
  placeholder: string = 'Выберите значение';
  @Input()
  disabled: boolean = false;

  private dropdown: HTMLElement;
  private dropdownSelect: HTMLElement;
  private dropdownMenu: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
    this.dropdownSelect = this.elementRef.nativeElement.querySelector('.dropdown .select');
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');

    this.dropdown.addEventListener('click', this.toggle.bind(this));
  }

  toggle(e: Event) {
    const dropdown = this.dropdown;

    if(e.target != this.dropdownSelect || this.disabled) return;

    if(!dropdown.classList.contains('active')) {
      this.openCombo();
    } else {
      this.closeCombo();
    }
  }

  select(e: Event, item: T) {
    const selectedItem = e.target as HTMLElement;

    if(!selectedItem.classList.contains('active')) {
      this.value = item;
      this.valueChanges.emit(item);
      this.closeCombo();
    }
  }

  openCombo() {
    const dropdownMenu = this.dropdownMenu;

    this.dropdown.classList.add('active');
    dropdownMenu.style.height = dropdownMenu.scrollHeight + 1 + 'px';
    dropdownMenu.addEventListener('transitionend', function () {
      setTimeout(function(){
        dropdownMenu.style.overflowY = 'auto';
      },150);
    }, { once: true });
  }

  closeCombo() {
    const dropdown = this.dropdown;

    this.dropdownMenu.style.overflowY = 'hidden';
    this.dropdownMenu.style.height = '0px';

    this.dropdownMenu.addEventListener('transitionend', function () {
      dropdown.classList.remove('active');
    }, { once: true });
  }
}
