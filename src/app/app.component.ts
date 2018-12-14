import { Component } from '@angular/core';
import { MessageService } from './Services/message.service';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InternetHospitalWebUI';

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) {
    if (this.authenticationService.hasAccessToken()) {
      this.messageService.startConnection();
    }
  }
}
