import { GPTService } from "./services/gpt.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Conversation } from "src/models/conversation";
import { GPTResponse } from "src/models/gpt-response";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public title: string = "ProgWeb2023.1";
  public isLoading: boolean = false;
  public hasQuestions: boolean = false;
  public themeColor: string = sessionStorage.getItem("themeColor") || "dark";
  public form: FormGroup = new FormGroup({
    question: new FormControl("", [Validators.required, Validators.minLength(1), Validators.nullValidator]),
  });

  public conversations: Conversation[] = [];


  ngOnInit(): void {
    this.initTheme();
  }

  constructor(private service: GPTService) { }


  public onSubmit(): void {
    if (this.form.valid && (this.form.get("question")?.value as string).trim().length > 0) {
      this.isLoading = true;
      this.hasQuestions = true;
      this.service.askMe(this.form.get("question")?.value)
        .subscribe({
          next: (response: GPTResponse) => {
            this.conversations.push({
              question: response.question as string,
              response: response.response.trim()
                .replaceAll("AI:", "")
                .replaceAll("Bot:", "") as string,
            });
          },
          error: (err) => {
            this.clearConversation();
            console.error(err);
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
    this.service.clearCache()
      .subscribe({
        next: (response) => {
          this.form.get("question")?.setValue("");
          this.conversations = [];
          this.hasQuestions = false;
          this.closeMenuWhenClick();
        },
        error: (err) => console.error(err),
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

}
