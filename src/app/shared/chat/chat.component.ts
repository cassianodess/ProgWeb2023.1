import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() text: string = '';
  @Input() chatId: string = '';

  constructor(private service: UserService){}

  public onDeleteChat() {
    console.log(this.chatId)
  }


}
