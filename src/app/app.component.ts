import { GPTService } from "./services/ask-me.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  
  ngOnInit(): void {
    this.initTheme();
  }

  constructor(private service: GPTService) {}


  public onSubmit(): void {
    if(this.form.valid && (this.form.get("question")?.value as string).trim().length > 0) {
      this.isLoading = true;
      this.hasQuestions = true;
      this.service.askMe(this.form.get("question")?.value).subscribe({
        next: (response: GPTResponse) => {
          (document.querySelector(".question") as HTMLElement).innerHTML = response.question as string;
          (document.querySelector(".response") as HTMLElement).innerHTML = response.response.trim().replaceAll("\n", "<br>") as string;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
      this.form.get("question")?.setValue("");
    }
  }

  clearConversation = (): void =>  {
    this.form.get("question")?.setValue("");
    this.hasQuestions = false;
    this.closeMenuWhenClick();

  }

  public onClick(event: any): void {
    this.form.get("question")?.setValue(event.target.innerText);
    this.onSubmit();
  }

  public initTheme(): void {

    if(this.themeColor == "dark") {
      this.themeColor = "dark";
    } else {
      this.themeColor = "light";
    }
    sessionStorage.setItem("themeColor", this.themeColor);
    this.setTheme();

  }

  toggleTheme = (): void =>  {
    if(sessionStorage.getItem("themeColor") == "dark") {
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
    
    if(sideBar.getAttribute("show")) {
      sideBar.removeAttribute("show");
    } else {
      sideBar.setAttribute("show", "true");
    }
  }
  
  public closeMenuWhenClick(): void {
    let sideBar: HTMLElement = document.querySelector(".sidebar") as HTMLElement;
    if(sideBar.getAttribute("show")) {
      sideBar.removeAttribute("show");
    }
  }

  public setTheme(): void {
    let main: HTMLElement = (document.querySelector(".main") as HTMLElement);
    if(sessionStorage.getItem("themeColor") == "light") {
      main.setAttribute("theme", "light");
    } else {
      main.removeAttribute("theme");
    }

  }

  
}
