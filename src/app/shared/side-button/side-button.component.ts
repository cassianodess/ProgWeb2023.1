import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-button',
  templateUrl: './side-button.component.html',
  styleUrls: ['./side-button.component.scss']
})
export class SideButtonComponent {

  @Input() icon: string = '';
  @Input() text: string = '';

}
