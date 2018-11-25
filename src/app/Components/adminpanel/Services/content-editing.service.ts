import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatingContent } from 'src/app/Models/Content/CreatingContent';
import { ArticleType } from 'src/app/Models/Content/ArticleType';
import { ContentTypeService } from './content-type.service';

@Injectable({
  providedIn: 'root'
})
export class ContentEditingService {

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    types: new FormControl([], Validators.required),
    shortDescription: new FormControl('', Validators.required),
    article: new FormControl('', Validators.required)
  });

  types: ArticleType[] = [];
  imgsFiles: File[] = [];
  imgs: string[] = [];
  croppedImgs: string[] = [];
  croppedFiles: File[] = [];

  creatingContent = new CreatingContent();
  constructor(private typeService: ContentTypeService) { }

  initializeContent() {
    this.clearData();
    this.form.setValue({
      title: '',
      shortDescription: '',
      article: '',
      types: []
    });
    console.log('before loading');
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
      console.log(data);
      console.log('In loading types!');
    });
  }

  clearData() {
    this.imgsFiles = [];
    this.imgs = [];
    this.croppedFiles = [];
    this.croppedImgs = [];
    this.types = [];
  }

  /*setForm(content: Content) {
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
      this.setSelectedTypes(content.types);
    });

    this.form.setValue({
      title: content.title,
      shortDescription: content.shortDescription,
      article: content.article
    });
    this.imgsFiles = content.articlePreviewAttachments;
    this.editingContent = content;
  }*/

  getNewContent() {
    const content = new CreatingContent();
    const contr = this.form.controls;
    content.title = contr.title.value;
    content.typeIds = contr.types.value;
    content.shortDescription = contr.shortDescription.value;
    content.articlePreviewAttachments = this.croppedFiles;
    content.article = contr.article.value;
    content.articleAttachments = [];
    return content;
  }

  setSelectedTypes(typeIds: number[]) {
    const arrType = [];
    for (let i = 0; i < typeIds.length && arrType.length !== typeIds.length; ++i) {
      arrType.push(this.types[ArticleType.indexInArrayById(typeIds[i], this.types)]);
    }
    this.form.controls.types.setValue(arrType);
  }
}
