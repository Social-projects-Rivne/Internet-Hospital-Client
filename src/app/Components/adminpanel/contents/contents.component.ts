import { Component, OnInit } from '@angular/core';
import { Content } from '../../../Models/Content';
import { CONTENTS_MNG } from '../routesConfig';
import { ADMIN_PANEL } from '../../../config';
import { ContentEditingService } from '../services/content-editing.service';
import { Router } from '@angular/router';
import { ArticleType } from 'src/app/Models/ArticleType';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  contMng = `/${ADMIN_PANEL}/${CONTENTS_MNG}`;
  contentItems: Content[] = [];

  constructor(private editingContent: ContentEditingService, private router: Router) {
  }

  ngOnInit() {
    for (let i = 0; i < 5; ++i) {
      this.contentItems.push(createNewContent(i));
    }
  }

  onChange(i: number) {
    this.editingContent.setForm(this.contentItems[i]);
    this.router.navigate([this.contMng]);
  }

  onDelete(i: number) {
    this.contentItems.splice(i, 1);
    // method for delete from DB
  }

}

// Generating data
// Constants used to fill up our data base.
const SURNAMES = [
  'Cook',
  'Smith',
  'Fuelk',
  'Stam',
  'Hill',
  'Gradje',
  'Mikj',
  'Vise',
  'Lake',
  'Nert',
  'Malt',
  'Gobs',
  'Fryder',
  'Mankohen',
  'Cherw'
];
const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

// Builds and returns a new Content.
function createNewContent(id: number): Content {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const surname = SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))];
  const lastname = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const email = surname.substr(0, Math.round(Math.random() * surname.length))
                + name.substr(0, Math.round(Math.random() * name.length))
                + '@gmail.com';

  const cont: Content = new Content();
  cont.id = id.toString();
  cont.title = email;
  cont.shortBody = lastname;
  cont.slides = [];
  cont.shortBody = '';
  for (let i = 0; i < 100; ++i) {
    cont.shortBody += 'wwwwwwwwww';
  }
  const aType = new ArticleType();
  aType.id = '1';
  aType.name = 'Real kek';
  cont.types = [aType];
  return cont;
}

