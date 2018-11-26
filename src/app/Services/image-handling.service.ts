import { Injectable } from '@angular/core';
import { ImageValidationService } from './image-validation.service';
import { NotificationService } from './notification.service';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

const MIN_HEIGHT = 150;
const MAX_HEIGHT = 3000;
const MIN_WIDTH = 150;
const MAX_WIDTH = 3000;
const PASSPORT = 'passport';
const LICENSE = 'license';
const DIPLOMA = 'diploma';

@Injectable({
  providedIn: 'root'
})

export class ImageHandlingService {

  constructor(private validation: ImageValidationService,
    private notification: NotificationService,
    private authentification: AuthenticationService) { }

    defaultImage = '../../assets/img/default.png';
    imageUrl: string = this.defaultImage;
    fileToUpload: File = null;
    passportToUpload: FileList = null;
    licenceToUpload: FileList = null;
    diplomaToUpload: FileList = null;
    isImageValid = false;
    isPassportUploaded = false;
    isDiplomaUploaded = false;
    isLicenseUploaded = false;
    succeededUploading = 0;

    handleFileInput(file: FileList) {
      this.imageUrl = this.defaultImage;
        this.fileToUpload = file.item(0);

        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event.target.readyState === FileReader.DONE) {
            if (this.validation.isImageFile(event.target.result) === false ) {
              this.fileToUpload = null;

              if (localStorage.getItem(this.authentification.token)) {
                const user = JSON.parse(localStorage.getItem(this.authentification.token));
                this.imageUrl = this.authentification.url + user.user_avatar;
              } else {
                this.imageUrl = this.defaultImage;
              }

              this.notification.error('Only image file is acceptable!');
              return;
            }
            const img = new Image();
            img.onload = () => {
                if (this.validation.hasImageValidSize(MAX_HEIGHT, MAX_WIDTH, MIN_HEIGHT, MIN_WIDTH, img.height, img.width)) {
                  this.imageUrl = event.target.result;
                  this.isImageValid = true;
                } else {
                    this.fileToUpload = null;

                    if (localStorage.getItem(this.authentification.token)) {
                      const user = JSON.parse(localStorage.getItem(this.authentification.token));
                      this.imageUrl = this.authentification.url + user.user_avatar;
                    } else {
                      this.imageUrl = this.defaultImage;
                    }

                    this.isImageValid = false;
                    this.notification.error('Image is invalid! It might be too big or too small.');
                }
            };
          img.src = event.target.result;
          }
        };
        if (this.fileToUpload != null) {
          reader.readAsDataURL(this.fileToUpload);
        }
      }

      handlePassportInput(target) {
        this.passportToUpload = target.files;
        if (this.passportToUpload.length < 3 || this.passportToUpload.length > 6) {
          this.notification.error('You must upload at least 3 photos (1, 2, 11 pages of passport) but no more than 6');
          target.value = '';
          this.isPassportUploaded = false;
        } else {
          this.uploadImages(target, PASSPORT);
        }
      }

      handleLicenseInput(target) {
        this.licenceToUpload = target.files;
        if (this.licenceToUpload.length !== 1) {
          this.notification.error('You must upload 1 license photo.');
          target.value = '';
          this.isLicenseUploaded = false;
        } else {
          this.uploadImages(target, LICENSE);
        }
      }

      handleDiplomaInput(target) {
        this.diplomaToUpload = target.files;
        if (this.diplomaToUpload.length < 1) {
          this.notification.error('You must upload at least 1 diploma photo.');
          target.value = '';
          this.isDiplomaUploaded = false;
        } else if (this.diplomaToUpload.length > 10) {
          this.notification.error('Exceeded the number of uploaded files.');
          target.value = '';
          this.isDiplomaUploaded = false;
        } else {
          this.uploadImages(target, DIPLOMA);
        }
      }

      uploadImages(target, fileType: string) {
        this.succeededUploading = 0;
        this.setIsUploaded(fileType, false);
        const filesCount = target.files.length;
        let filesToUpload = target.files;
        for (let i = 0; i < filesCount; i++) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
             if (event.target.readyState === FileReader.DONE) {
              if (this.validation.isImageFile(event.target.result) === false ) {
                filesToUpload = this.setUploadedToNull(fileType);
                this.setIsUploaded(fileType, false);
                this.notification.error('Only image file is acceptable!');
                target.value = '';
                return;
              } else {
                 if (filesToUpload === null) {
                  target.value = '';
                   return;
                 }
                const img = new Image();
                img.onload = () => {
                  if (this.validation.hasImageValidSize(MAX_HEIGHT, MAX_WIDTH, MIN_HEIGHT, MIN_WIDTH, img.height, img.width)) {
                    ++this.succeededUploading;
                    if (this.succeededUploading === filesCount) {
                      this.setIsUploaded(fileType, true);
                      this.notification.success('Images successfully uploaded!');
                      return;
                    }
                  } else {
                      this.setUploadedToNull(fileType);
                      this.setIsUploaded(fileType, false);
                      this.notification.error('One or more images are invalid! They might be too big or too small.');
                      target.value = '';
                  }
                };
                img.src = event.target.result;
              }
             }
          };
          if (this.checkUploadedFiles(fileType) != null) {
            reader.readAsDataURL(target.files.item(i));
          }
        }
      }

  private setIsUploaded(fileType: string, isValid: boolean) {
      if (fileType === PASSPORT) {
        this.isPassportUploaded = isValid;
    } else if (fileType === LICENSE) {
        this.isLicenseUploaded = isValid;
    } else if (fileType === DIPLOMA) {
        this.isDiplomaUploaded = isValid;
    }
  }

  private checkUploadedFiles(fileType: string) {
      if (fileType === PASSPORT) {
        return this.passportToUpload;
    } else if (fileType === LICENSE) {
        return this.licenceToUpload;
    } else if (fileType === DIPLOMA) {
        return this.diplomaToUpload;
    }
    return null;
  }

  private setUploadedToNull(fileType: string) {
      if (fileType === PASSPORT) {
        this.passportToUpload = null;
    } else if (fileType === LICENSE) {
        this.licenceToUpload = null;
    } else if (fileType === DIPLOMA) {
        this.diplomaToUpload = null;
    }
    return null;
  }
}
