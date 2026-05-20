import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare const $:any;

@Component({
  selector: 'app-login',
  standalone: true, // Good practice to explicitly declare this
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {

  // 1. Combine all injected services into a single constructor
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private httpclient: HttpClient,
    private cookieService: CookieService
  ) {}

  // 2. Add the class when the login page loads
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
  }

  // 3. REMOVE the class when the user leaves to go to the dashboard
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'login-page');
  }

  // The function that runs when the button is clicked
  login() {
    // Later, you will add your email/password checking logic right here!

    // For now, just send the user straight to the dashboard
    this.router.navigate(['/dashboard']);
  }

  showPeringatanModal(message: string): void{
    $("#peringatanModal").modal();
    $("#pm_message").html(message);
  }

  signIn(): void {
    console.log("signIn()");

    var userId = $("#idText").val();
    userId = encodeURIComponent(userId);

    var password = $("#passwordText").val();
    password = encodeURIComponent(password);

    var url = "https://stmikpontianak.cloud/011100862/login.php" +
      "?id=" + userId +
      "&password=" + password;
    console.log("url : " + url);

    this.httpclient.get(url).subscribe((data: any) => {
      console.log(data);
      var row = data[0];

      if (row.idCount != "1"){
        this.showPeringatanModal("Id atau password tidak cocok");
        return;
      }

      this.cookieService.set("userId", userId);
      console.log("session data berhasil dibuat");
      this.router.navigate(["/dashboard"])
    });
  }
}
