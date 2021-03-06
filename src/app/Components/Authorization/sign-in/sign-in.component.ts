import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../Services/authentication.service';
import { ADMIN_PANEL } from '../../../config';
import { NotificationService } from '../../../Services/notification.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    isLoadingResults = false;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notification: NotificationService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.isLoadingResults = true;
        if (this.loginForm.invalid) {
            this.isLoadingResults = false;
            return;
        }
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (this.authenticationService.hasAdminRole()) {
                        this.isLoadingResults = false;
                        this.router.navigate([ADMIN_PANEL]);
                    } else {
                        this.isLoadingResults = false;
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    this.notification.error(error);
                    this.isLoadingResults = false;
                });
    }
}
