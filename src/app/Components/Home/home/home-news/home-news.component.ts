import { Component, OnInit } from '@angular/core';

import { HomePageContent } from 'src/app/Models/Content/HomePageContent';

import { HomeContentService } from 'src/app/Services/home-content.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  contents: HomePageContent[] = [];
  amountForLoading = 1;
  lastId = null;
  isLast = false;
  isLoading = false;
  isLoggedIn: Observable<boolean>;

  constructor(private contentService: HomeContentService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadContent();
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }

  loadContent() {
    if (!this.isLast) {
      this.isLoading = true;
      this.contentService.getShortModeratorContent(this.amountForLoading, this.lastId)
        .subscribe((data: any) => {
          this.contents = this.contents.concat(data.articles);
          this.lastId = data.lastArticleId;
          this.isLast = data.isLast;
          this.isLoading = false;
        });
    }
  }
}
