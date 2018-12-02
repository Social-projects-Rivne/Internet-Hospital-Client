import { Injectable } from '@angular/core';
import * as collections from 'typescript-collections';
import { HOST_URL } from 'src/app/config';
import { NotificationService } from 'src/app/Services/notification.service';
import { ImageValidationService } from 'src/app/Services/image-validation.service';

const ARTICLE_IMG_URL = 'HomePage/%$#@_article_id_@$#%/Attachments';
const IMAGE_NAME_KEY = '%$#@_attachment_#';

@Injectable({
  providedIn: 'root'
})
export class FroalaService {

  existingImages: string[] = [];
  removedExistingImages: string[] = [];
  froalaOptions: Object = {
    events: {
      'froalaEditor.image.beforeUpload': (event, editor, files) => {

        const file = this.getLoadedImageFile(files);
        this.froalaImgsAll.setValue(`id-${++this.counter}`, file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.imgService.isImageFile(e.target.result) === false ) {
            this.notificationService.error('Only image files are acceptable!');
            return false;
          }
          const result = e.target.result;
          editor.image.insert(result, true, { 'id': `id-${this.counter}` }, editor.image.get());
        };
        reader.readAsDataURL(file);

        editor.popups.hideAll();
        return false;
      },
      'froalaEditor.video.beforeUpload': (event, editor, video) => {
        this.notificationService.error('This functionality is restricted!');
        return false;
      },
      'froalaEditor.file.beforeUpload': (event, editor, video) => {
        this.notificationService.error('This functionality is restricted!');
        return false;
      }
    },
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  };

  froalaImgsToSend: File[] = [];
  froalaImgsAll = new collections.Dictionary<string, File>();
  counter = 0;
  article = '';

  constructor(private notificationService: NotificationService,
              private imgService: ImageValidationService) { }

  getLoadedImageFile(img): File {
    let file: File;
    if (img instanceof FileList) {
      file = img.item(0);
    } else {
      const extension = `.${img[0].type.slice(img[0].type.lastIndexOf('/') + 1)}`;
      const name = this.counter + 1 + extension;
      console.log(name);
      file = new File([img[0]], name, { lastModified: Date.now() });
    }
    return file;
  }

  getFroalaResultBody(): string {
    return this.handleFroalaResult();
  }

  // Changing path of imgs to our path and check what img's should be deleted.
  handleFroalaResult(): string {
    const froalaDiv = document.createElement('div');
    froalaDiv.innerHTML = this.article.slice();
    const img = froalaDiv.getElementsByTagName('img');
    const notRemovedImgs = [];
    this.froalaImgsToSend = [];
    for (let i = 0; i < img.length; i++) {
      const id = img.item(i).getAttribute('data-id');
      if (this.froalaImgsAll.containsKey(id)) {
        this.handleNewImage(img.item(i), id, i);
      } else {
        notRemovedImgs.push(img.item(i).src.replace(HOST_URL, ''));
      }
    }
    this.setRemovedImgs(notRemovedImgs);
    return froalaDiv.innerHTML;
  }

  setRemovedImgs(imgs: string[]) {
    this.removedExistingImages = this.existingImages.filter((img) => {
      return !imgs.includes(img);
    });
  }

  handleNewImage(img, id, number) {
    const file = this.froalaImgsAll.getValue(id);
    this.froalaImgsToSend.push(file);
    img.src = `${HOST_URL}/${ARTICLE_IMG_URL}/${IMAGE_NAME_KEY}${number + 1}`;
    img.removeAttribute('data-id');
  }

  private getExtension(filename: string) {
    const idx = filename.lastIndexOf('.');
    return (idx < 1) ? '' : filename.substr(idx);
  }

  clearFroala() {
    this.article = '';
    this.froalaImgsToSend = [];
    this.froalaImgsAll = new collections.Dictionary<string, File>();
    this.counter = 0;
    this.existingImages = [];
    this.removedExistingImages = [];
  }
}
