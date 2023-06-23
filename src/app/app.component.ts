import { AuthService } from '@auth0/auth0-angular';
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Conversation } from "src/models/conversation";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent  {

  public title: string = "ProgWeb2023.1";
 
}
