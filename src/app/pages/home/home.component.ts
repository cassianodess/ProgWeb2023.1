import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/models/chat';
import { GPTRequestBody } from 'src/models/gpt-response-body';
import { Message } from 'src/models/message';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public themeColor: string = sessionStorage.getItem("themeColor") || "dark";
  public form: FormGroup = new FormGroup({
    question: new FormControl("", [Validators.required, Validators.minLength(1), Validators.nullValidator]),
  });
  public messages: Message[] = [];
  public id: string = "";
  public user: User | null = null;
  public chatId: string | null = null;


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.userService.findById(this.id).subscribe({
      next: (user) => {
        sessionStorage.setItem("userId", user.id as string);
        this.user = user;
        this.initTheme();
      },
      error: (err) => {
        this.openSnackBar(err.message, true);
        this.router.navigate(["auth"]);
      }
    });
  }

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  logout = () => {
    sessionStorage.clear();
    this.router.navigate(["/auth"]);
  }


  public openSnackBar(message: string, fail: boolean) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  public updateChats(event: any) {
    let updatedChats: Chat[] = event;
    this.user!.chats = updatedChats;
    let chat: Chat = this.user?.chats.filter(_chat => _chat.id === this.chatId).at(0) as Chat;
    if(!chat) {
      this.newChat();
    }

  }

  public onSubmit(): void {
    if (this.form.valid && (this.form.get("question")?.value as string).trim().length > 0) {
      this.isLoading = true;
      let requestBody: GPTRequestBody = {
        question: this.form.get("question")?.value,
        chatId: this.chatId || ""
      }
      this.userService.askMe(requestBody)
        .subscribe({
          next: (chat: Chat) => {
            if(this.chatId == null) {
              this.user?.chats?.push(chat);
              this.chatId = chat.id as string;
            } else {
              this.user?.chats?.map(_chat => {
                if(_chat.id === chat.id) {
                  _chat.messages = chat.messages;
                }
              });
            }
            this.messages = chat.messages;
          },
          error: (err) => {
            this.clearConversation();
            this.openSnackBar("Erro ao buscar informações.", true);
            this.isLoading = false;

          },
          complete: () => {
            this.isLoading = false;
            this.scrollToBottom();
          }
        });
      this.form.get("question")?.setValue("");
    }
  }

  scrollToBottom = () => {
    let mainTop = document.querySelector(".main-top") as HTMLElement;
    setTimeout(() => {
      mainTop.scrollTo({
        behavior: 'smooth',
        top: mainTop.scrollHeight,
        left: 0,
      });
    }, 200);
  }

  clearConversation = (): void => {
    this.isLoading = true;
    this.userService.clearCache()
      .subscribe({
        next: (response) => {
          this.form.get("question")?.setValue("");
          this.messages = [];
          this.closeMenuWhenClick();
        },
        error: (err) => this.openSnackBar("Erro ao tentar limpar conversa", true),
        complete: () => {
          this.isLoading = false;
          this.closeMenuWhenClick();
        }

      });

  }

  public onClick(event: any): void {
    this.form.get("question")?.setValue(event.target.innerText);
    this.onSubmit();
  }

  public initTheme(): void {

    if (this.themeColor == "dark") {
      this.themeColor = "dark";
    } else {
      this.themeColor = "light";
    }
    sessionStorage.setItem("themeColor", this.themeColor);
    this.setTheme();

  }

  toggleTheme = (): void => {
    if (sessionStorage.getItem("themeColor") == "dark") {
      this.themeColor = "light";
      sessionStorage.setItem("themeColor", "light");
    } else {
      this.themeColor = "dark";
      sessionStorage.setItem("themeColor", "dark");
    }
    this.setTheme();
    this.closeMenuWhenClick();

  }

  public toggleMenu(): void {
    let sideBar: HTMLElement = document.querySelector(".sidebar") as HTMLElement;

    if (sideBar.getAttribute("show")) {
      sideBar.removeAttribute("show");
    } else {
      sideBar.setAttribute("show", "true");
    }
  }

  public closeMenuWhenClick(): void {
    let sideBar: HTMLElement = document.querySelector(".sidebar") as HTMLElement;
    if (sideBar.getAttribute("show")) {
      sideBar.removeAttribute("show");
    }
  }

  public setTheme(): void {
    let main: HTMLElement = (document.querySelector(".main") as HTMLElement);
    if (sessionStorage.getItem("themeColor") == "light") {
      main.setAttribute("theme", "light");
    } else {
      main.removeAttribute("theme");
    }

  }

  public onSelectChat(event: Event) {
    let _chatId: string = (event.target as HTMLDivElement).id as string;
    let messages: Message[] = (this.user?.chats as Chat[]).filter(_chat => (_chat.id === _chatId)).at(0)?.messages as Message[];
    if(messages) {
      this.chatId = _chatId;
      this.messages = [];
      this.messages = messages;
      this.scrollToBottom();
    }

  }

  public newChat() {
    this.messages = [];
    this.chatId = null;
  }

}
