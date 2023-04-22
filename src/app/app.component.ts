import { GPTService } from './services/ask-me.service';
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
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({
    question: new FormControl(''),
  });

  
  ngOnInit(): void {

  }

  constructor(private service: GPTService) {}


  public onSubmit(): void {
    this.isLoading = true;
    this.service.askMe(this.form.get("question")?.value).subscribe({
      next(response: GPTResponse) {
        console.log(response);
      },
      error(err) {
        console.error(err)
      }
    });
    this.isLoading = false;
  }
}
