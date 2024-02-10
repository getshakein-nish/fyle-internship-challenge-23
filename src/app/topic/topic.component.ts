import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styles: [
  ]
})
export class TopicComponent {
@ Input() topicData: string ="";
}
