import {Component, Directive, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActiveDescendantKeyManager, Highlightable} from '@angular/cdk/a11y';

@Directive({
  selector: '[role="option"]',
  host: {
    '[class.active-option]' : 'isActive'
  }
})
export class ColorOption implements Highlightable {
  isActive = false;

  setActiveStyles(): void {
    this.isActive = true;
  }

  setInactiveStyles(): void {
    this.isActive = false;
  }
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styles: []
})
export class ColorPickerComponent {
  isOpen = false;
  selectedColor = '';

  @ViewChildren(ColorOption) options: QueryList<ColorOption>;
  keyManager: ActiveDescendantKeyManager<ColorOption>;

  colors = [
    {hex: '#F44336', name: 'Purple'},
    {hex: '#E91E63', name: 'Red'},
    {hex: '#673AB7', name: 'Pink'},
    {hex: '#3F51B5', name: 'Indigo'},
    {hex: '#00BCD4', name: 'Cyan'},
    {hex: '#4CAF50', name: 'Green'},
    {hex: '#FFEB3B', name: 'Yellow'},
    {hex: '#FF9800', name: 'Orange'},
    {hex: '#795548', name: 'Brown'},
  ];


  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
  }

  keydownHandler(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }
}
