import { Component, OnInit } from '@angular/core';
import { profileIconNames } from './profile-icon-names';


@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
})
export class ProfileIconSelectorComponent {
  
  profileIcons!: string[];
  ngOnInit() {
    this.profileIcons = profileIconNames;
    console.log(this.profileIcons)
  } 
  
  
}
