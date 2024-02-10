import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styles: [
  ]
})
export class RepositoryComponent {
  @Input () repoData={name:"repository",description:"description",topics:[""]};
  
}
