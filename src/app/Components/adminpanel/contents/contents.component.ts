import { Component, OnInit } from '@angular/core';
import { ShortContentWithEditors } from '../../../Models/Content/ShortContentWithEditors';
import { CONTENTS_MNG } from '../routesConfig';
import { ADMIN_PANEL } from '../../../config';
import { ContentEditingService } from '../services/content-editing.service';
import { Router } from '@angular/router';
import { ContentEdition } from 'src/app/Models/Content/ContentEdition';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  contMng = `/${ADMIN_PANEL}/${CONTENTS_MNG}`;
  contentItems: ShortContentWithEditors[] = [];

  constructor(private editingContent: ContentEditingService, private router: Router) {
  }

  ngOnInit() {
    for (let i = 0; i < 5; ++i) {
      this.contentItems.push(createNewContent(i));
    }
  }

  onChange(i: number) {
    // content number get
    // this.editingContent.setForm(this.contentItems[i]);
    this.router.navigate([this.contMng]);
  }

  onDelete(i: number) {
    this.contentItems.splice(i, 1);
    // method for delete from DB
  }

  createNewArticle() {
    this.editingContent.initializeContent();
    this.router.navigate([this.contMng]);
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
function createNewContent(id: number): ShortContentWithEditors {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const surname = SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))];
  const lastname = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const email = surname.substr(0, Math.round(Math.random() * surname.length))
                + name.substr(0, Math.round(Math.random() * name.length))
                + '@gmail.com';

  const cont: ShortContentWithEditors = new ShortContentWithEditors();
  cont.id = id;
  cont.title = email;
  cont.shortDescription = '';
  cont.date = new Date();
  cont.date.setMonth(Math.round(Math.random() * 12));
  cont.editions = [];
  for (let i = Math.round(Math.random() * 5); i >= 0; --i) {
    const edit = new ContentEdition();
    edit.author = name[i] + ' ' + surname[i] + ' ' + lastname[i];
    edit.date = new Date();
    edit.date.setMonth(Math.round(Math.random() * cont.date.getMonth()));
    cont.editions.push(edit);
  }
  cont.author = name + ' ' + surname + ' ' + lastname;
  for (let i = 0; i < 100; ++i) {
    cont.shortDescription += 'wwwwwwwwww';
  }

  cont.types = ['kek' , '4eburek'];
  return cont;
}

