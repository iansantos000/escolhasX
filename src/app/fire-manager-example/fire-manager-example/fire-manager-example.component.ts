import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileItem, ResizeMethod, FireUploaderProgress } from '@ngx-fire-uploader/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-fire-manager-component',
  templateUrl: './fire-manager-example.component.html',
  styleUrls: ['./fire-manager-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FireManagerExampleComponent {

  files = [];
  links = [];
  progress: FireUploaderProgress;
  active = false;

  notifOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  uniqueName = true;
  dropZone = true;
  multiple = true;
  maxFilesCount = 20;
  maxFileSize = 5;
  paramName;
  paramDir = 'DIRname';
  placeholder = 'Arraste as imagens para fazer o Upload';
  accept = null;
  parallelUploads = 3;
  thumbs = true;
  thumbWidth = 250;
  thumbHeight = 250;
  resizeWidth;
  resizeHeight;
  resizeMethod = ResizeMethod.Crop;

  constructor(private notifications: NotificationsService) {
  }

  onFiles(e) {
    this.files = e;
  }

  onSuccess(e: FileItem) {
    this.notifications.success('File uploaded successfully!', e.state.name, this.notifOptions);
  }

  onComplete(e) {
    this.links = e.map(file => file.downloadURL);
    this.notifications.info('Operation finished!', `${this.links.length} files has been uploaded`, this.notifOptions);
  }

  onProgress(e) {
    this.progress = e;
  }

  onRemove(e: FileItem) {
    this.notifications.info('File removed!', e.state.name, this.notifOptions);
  }

  onCancel(e: FileItem) {
    this.notifications.info('Upload cancelled!', e.state.name, this.notifOptions);
  }

  onError(e) {
    this.notifications.error('Error!', e.message, this.notifOptions);
  }

  onReset() {
    this.notifications.alert('Cleared!', 'All items has been removed', this.notifOptions);
  }

  onValue(e) {
    console.log('value', e);
  }

  onActive(e) {
    this.active = e;
  }

}
