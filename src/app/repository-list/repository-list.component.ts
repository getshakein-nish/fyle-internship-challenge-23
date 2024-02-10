import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styles: [
  ]
})
export class RepositoryListComponent {
@ Input() repoList=[{name:"repository",description:"repository",topics:["topic"]}];
@Output() perPageRepoDataEvent= new EventEmitter<string>();

}
