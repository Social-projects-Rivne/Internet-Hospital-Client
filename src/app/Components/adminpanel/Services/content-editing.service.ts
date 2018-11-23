import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Content } from 'src/app/Models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentEditingService {

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    types: new FormControl('', Validators.required),
    shortBody: new FormControl('', Validators.required),
    article: new FormControl('', Validators.required)
  });
  imgsFiles: File[] = [];
  imgs: string[] = [];
  croppedImgs: string[] = [];
  croppedFiles: File[] = [];
  editingContent: Content;
  constructor() { }

  initializeFormGroup() {
    this.form.setValue({
      title: '',
      types: '',
      shortBody: '',
      article: ''
    });
  }

  clearImages() {
    this.imgsFiles = [];
    this.imgs = [];
    this.croppedFiles = [];
    this.croppedImgs = [];
  }

  setForm(content: Content) {
    this.form.setValue({
      title: content.title,
      types: content.types,
      shortBody: content.shortBody,
      article: content.article
    });
    this.imgsFiles = content.slides;
    this.editingContent = content;
  }

  getContent() {
    const content = new Content();
    const contr = this.form.controls;
    content.title = contr.title.value;
    content.types = contr.types.value;
    content.shortBody = contr.shortBody.value;
    content.slides = this.croppedFiles;
    content.article = contr.article.value;
    content.id = this.editingContent.id;
    return content;
  }

  logForm() {
    console.log(this.form);
  }
}
