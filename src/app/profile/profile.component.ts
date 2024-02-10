import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  @ Input() user={name:"",bio:"",location:"",public_repos:0};
}
