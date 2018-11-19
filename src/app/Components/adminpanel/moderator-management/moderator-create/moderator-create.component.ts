import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeratorService } from '../../Services/moderator.service';
import { MODERATORS_MNG } from '../../routesConfig';
import { ADMIN_PANEL } from '../../../../config';
import { CreatingModerator } from '../../../../Models/CreatingModerator';
import { compareValidator } from '../../../../Directives/compare-validator.directive';
import { NotificationService } from '../../../../Services/notification.service';

@Component({
  selector: 'app-moderator-create',
  templateUrl: './moderator-create.component.html',
  styleUrls: ['./moderator-create.component.scss']
})
export class ModeratorCreateComponent implements OnInit {

  isLoadingResults = false;
  moderatorsManagePath = `/${ADMIN_PANEL}/${MODERATORS_MNG}`;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    thirdName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,
                                    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,24}$/)]),
    confirmPassword: new FormControl('', [ Validators.required, compareValidator('password') ]),
  });


  constructor(private service: ModeratorService, private router: Router, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoadingResults = true;
      const moderator = new CreatingModerator();
      const values = this.form.controls;
      moderator.email = values.email.value;
      moderator.firstName = values.firstName.value;
      moderator.secondName = values.secondName.value;
      moderator.thirdName = values.thirdName.value;
      moderator.password = values.password.value;
      moderator.confirmPassword = values.confirmPassword.value;
      this.service.postModerator(moderator).subscribe( (data: any) => {
        this.isLoadingResults = false;
        this.notification.success(data.message);
        this.router.navigate([this.moderatorsManagePath]);
      }, error => {
        this.isLoadingResults = false;
        this.notification.error(error);
      });
    }
  }
}
