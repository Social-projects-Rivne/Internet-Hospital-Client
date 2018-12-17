import { Component, OnInit } from '@angular/core';
import { ShortContentWithEditors } from 'src/app/Models/Content/ShortContentWithEditors';
import { ContentModerateFilters } from 'src/app/Models/Content/ContentModerateFilters';

import { ContentService } from 'src/app/Components/adminpanel/Services/content.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  contents: ShortContentWithEditors[];
  isLoggedIn: Observable<boolean>;

  constructor(private contentService: ContentService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadContent();
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }

  loadContent() {
    const filter = new ContentModerateFilters();
    filter.page = 0;
    filter.pageSize = 1000;
    this.contentService.getShortModeratorContent(filter).subscribe((data: any) => {
      console.log(data);
      this.contents = data.results;
    });
  }
}
