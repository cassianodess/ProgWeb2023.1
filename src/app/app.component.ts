import { AskMeService } from './services/ask-me.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GPTResponse } from 'src/models/gpt-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'ProgWeb2023.1';

  public form: FormGroup = new FormGroup({
    question: new FormControl(''),
  });

  
  ngOnInit(): void {

  }

  constructor(private service: AskMeService) {

  }


  public onSubmit(): void {
    console.log();
    this.service.askMe(this.form.get("question")?.value).subscribe({
      next(response: GPTResponse) {
        console.log(response);
      }
    });
  }
}
