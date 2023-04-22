import { GPTService } from './services/ask-me.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GPTResponse } from 'src/models/gpt-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'ProgWeb2023.1';
  public isLoading: boolean = false;
  public hasQuestions: boolean = false;
  public form: FormGroup = new FormGroup({
    question: new FormControl('', [Validators.required, Validators.minLength(1), Validators.nullValidator]),
  });

  
  ngOnInit(): void {

  }

  constructor(private service: GPTService) {}


  public onSubmit(): void {
    if(this.form.valid && (this.form.get("question")?.value as string).trim().length > 0) {
      this.isLoading = true;
      this.hasQuestions = true;
      this.service.askMe(this.form.get("question")?.value).subscribe({
        next(response: GPTResponse) {
          (document.querySelector(".question") as HTMLElement).innerHTML = response.question as string;
          (document.querySelector(".response") as HTMLElement).innerHTML = response.response.trim().replaceAll("\n", "<br>") as string;
        },
        error(err) {
          console.error(err);
        },
      });
      this.form.get("question")?.setValue("");
      this.isLoading = false;
    }
  }

  clearConversation = (): void =>  {
    this.form.get("question")?.setValue('');
    this.hasQuestions = false;
  }

  public onClick(event: any): void {
    this.form.get("question")?.setValue(event.target.innerText);
    // this.onSubmit();
  }
}
