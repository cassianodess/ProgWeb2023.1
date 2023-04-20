import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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


  public onSubmit(): void {
    console.log(this.form.get("question")?.value);
  }
}
