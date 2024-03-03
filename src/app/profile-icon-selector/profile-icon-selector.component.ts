import { Component, OnInit, Provider, forwardRef } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true,
}

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR],
})

export class ProfileIconSelectorComponent implements ControlValueAccessor, OnInit {
  profileIcons!: string[];
  showAllIcons = true;
  selectedIcon!: string | null;

  private onChange!: (icon: string | null) => void;
  private onTouched!: () => void;

  writeValue(icon: string |null): void {
    this.selectedIcon = icon;
    if(icon && icon !== '') {
      this.showAllIcons = false;
    }
    else {
      this.showAllIcons = true;
    }
  }
  registerOnChange(fn: Function): void {
    this.onChange = (icon: string | null) => { fn(icon) };
  }
  registerOnTouched(fn: Function): void {
    this.onTouched = () => { fn() };
  }

  ngOnInit() {
    this.profileIcons = profileIconNames;
    console.log(this.profileIcons);
  } 
  
  iconSelected(iconName: string) {
    this.showAllIcons = false;
    this.selectedIcon = iconName;
    this.onChange(iconName);
  }
}
