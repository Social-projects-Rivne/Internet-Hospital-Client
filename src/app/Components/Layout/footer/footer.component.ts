import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  isLoggedIn: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }

}
