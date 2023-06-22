import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private authUrl: string = "";

  constructor(private router: Router, private service: OauthService) { }
  ngOnInit() {
    this.service.GetAuthPage().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => console.error(err)
    });
  }

  public login() {
    this.router.navigate(["/"], { queryParams: { url: this.authUrl } });

  }


  public onClick() { }

}
