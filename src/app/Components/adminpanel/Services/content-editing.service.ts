import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Content } from '../../../Models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentEditingService {

  form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    title: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  });
  imgsFiles: File[] = [];
  imgs: string[] = [];
  croppedImgs: string[] = [];
  croppedFiles: File[] = [];

  constructor() { }

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      title: '',
      body: '',
      source: ''
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
      id: content.id,
      title: content.title,
      body: content.body,
      source: content.source
    });
    this.imgsFiles = content.images;
    this.form.controls.title.setValue('2222');
    console.log(`suka blet roby ${content.title}`);
  }

  getContent() {
    const content = new Content();
    const contr = this.form.controls;
    content.id = contr.id.value;
    content.body = contr.body.value;
    content.source = contr.source.value;
    content.title = contr.title.value;
    content.images = this.croppedFiles;
    return content;
  }

  logForm() {
    console.log(this.form);
  }
}
