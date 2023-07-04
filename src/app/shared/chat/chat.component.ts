import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() text: string = '';
  @Input() chatId: string = '';
  @Output() emmiter: EventEmitter<Chat[]> = new EventEmitter();

  constructor(private service: UserService){}

  public onDeleteChat() {
    this.service.deleteChat(this.chatId).subscribe({
      next: (chats: Chat[]) => {
        this.emmiter.emit(chats);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
