import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Output() getNextPageEvent = new EventEmitter();
  @Output() getPrevPageEvent = new EventEmitter();

  getNextPage(){
    this.getNextPageEvent.emit();
  }

  getPrevtPage(){
    this.getPrevPageEvent.emit();
  }
}
