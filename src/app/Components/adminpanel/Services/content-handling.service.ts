import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatingContent } from '../../../Models/Content/CreatingContent';
import { ArticleType } from '../../../Models/Content/ArticleType';
import { ContentTypeService } from './content-type.service';
import { ContentForEditing } from '../../../Models/Content/ContentForEditing';
import { EditedContent } from '../../../Models/Content/EditedContent';

@Injectable({
  providedIn: 'root'
})
export class ContentHandlingService {

  form: FormGroup = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    types: new FormControl([], Validators.required),
    shortDescription: new FormControl('', [ Validators.required, Validators.maxLength(1000) ]),
    article: new FormControl('', Validators.required)
  });

  editingContent: ContentForEditing = null;

  types: ArticleType[] = [];

  constructor(private typeService: ContentTypeService) { }

  initializeContent() {
    this.clearData();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.setValue({
      title: '',
      types: [],
      shortDescription: '',
      article: ''
    });
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
    });
  }

  setForm(content: ContentForEditing) {
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
      this.form.controls.types.setValue(this.getSelectedTypes(content.typeIds));
    });
    this.form.setValue({
      title: content.title,
      shortDescription: content.shortDescription,
      article: content.text,
      types: []
    });
    this.editingContent = content;
  }

  getSelectedTypes(types) {
    const selectedTypes = this.types.filter( type => {
      return types.includes(type.id);
    });
    return selectedTypes;
  }

  clearData() {
    this.types = [];
    this.editingContent = null;
  }

  getNewContent() {
    const content = new CreatingContent();
    const contr = this.form.controls;
    content.title = contr.title.value;
    content.typeIds = [];
    for (let i = 0; i < contr.types.value.length; ++i) {
      content.typeIds.push(contr.types.value[i].id);
    }
    content.shortDescription = contr.shortDescription.value;
    return content;
  }

  getEditedContent() {
    const content = new EditedContent();
    content.id = this.editingContent.id;
    const contr = this.form.controls;
    content.title = contr.title.value;
    content.typeIds = [];
    for (let i = 0; i < contr.types.value.length; ++i) {
      content.typeIds.push(contr.types.value[i].id);
    }
    content.shortDescription = contr.shortDescription.value;
    return content;
  }
}
