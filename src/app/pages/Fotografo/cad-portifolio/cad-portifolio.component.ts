import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FirePhotoComponent } from '@ngx-fire-uploader/photo';
import { NotificationsService } from 'angular2-notifications';
import { FileItem, ResizeMethod, FireUploaderProgress } from '@ngx-fire-uploader/core';
import { UserService } from 'src/app/shared/user.service';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const DEFALT_IMAGES =
  'https://media.wired.com/photos/59268c5dcfe0d93c474309a2/master/w_1300,c_limit/BSP_054.jpg';

  export interface Item { name: string; }
@Component({
  selector: 'app-cad-portifolio',
  templateUrl: './cad-portifolio.component.html',
  styleUrls: ['./cad-portifolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class CadPortifolioComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: any;

  name: string;
  uid: string;
  email: string;

  defaultImage = 'http://via.placeholder.com/150x150';
  imageData: any = {};

  constructor(  private notifier: NotificationService,
                private notifications: NotificationsService,
                private userService: UserService,
                private afs: AngularFirestore
              ) { }

  // Capa Portifolio
  capaPortifolioDisabled = false;
  portifolioDisabled = false;
  profilePhoto = DEFALT_IMAGES;
  coverPhoto = DEFALT_IMAGES;

  // fotos portifolios
  files = [];
  links = [];
  progress: FireUploaderProgress;
  fileCapa = [];
  linksCapa = [];
  progressCapa: FireUploaderProgress;
  active = false;

  notifOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10
  };

  uidUser;
  uniqueName = false;
  dropZone = true;
  multiple = true;
  maxFilesCount = 20;
  maxFileSize = 10;
  paramName;
  namePortifolio;
  paramDirPortifolio;
  textPortifolio;
  paramDirPortifolioCapa = 'CAPA';
  placeholder = 'Adicione fotos do portifoliio.';
  accept = null;
  parallelUploads = 2;
  thumbs = true;
  thumbWidth = 100;
  thumbHeight = 100;
  thumbWidthCapa = 250;
  thumbHeightCapa = 800;
  resizeWidth;
  resizeHeight;
  resizeMethod = ResizeMethod.Crop;

  personalPostsRef: any;
  postLists: any = [];

  @ViewChildren(FirePhotoComponent) uploaders: QueryList<FirePhotoComponent>;

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      const user = this.userService.getProfile();
      if (user && user.name) {
        this.name = user.name;
        this.email = user.email;
        this.uid = user.uid;
      }

    });


  }

  onValue(e) {
    console.log('onValue', e);
  }

  onFiles(e) {
    this.files = e;
  }

  onFilesCapa(e) {
    this.fileCapa = e;
  }

  onSuccessPortifolio(e: FileItem) {
    this.notifications.success('Imagens carregadas com sucesso!', e.state.name, this.notifOptions);

    // firestore
    firebase.database().ref( this.uid + '/' + 'PORTIFOLIOS/' + this.paramDirPortifolio ).push({
      name: e.state.name,
      imagens: e.state.downloadURL,
      registrationDate: new Date().toString(),
      status: true,
      capa: false,
    });

    // clound Database
    this.afs.collection(this.uid)
            .doc('PORTIFOLIOS')
            .collection(this.paramDirPortifolio)
            .add({
              name: e.state.name,
              imagens: e.state.downloadURL,
              registrationDate: new Date().toString(),
              registratioFor: this.uid,
              status: true,
              capa: false,
            });
  }

  onSuccessCapa(e: FileItem) {
    this.notifications.success('Imagen da capa carregada com sucesso!', e.state.name, this.notifOptions);
    // firestore
    firebase.database().ref( this.uid + '/' + 'PORTIFOLIOS/' + this.paramDirPortifolio + '/CAPA' ).set({
      name: e.state.name,
      imagens: e.state.downloadURL,
      registrationDate: new Date().toString(),
      status: true,
      capa: true,
    });

    // clound Database
    this.afs.collection(this.uid)
            .doc('PORTIFOLIOS')
            .collection(this.paramDirPortifolio)
            .doc('CAPA').set({
              name: e.state.name,
              imagens: e.state.downloadURL,
              registrationDate: new Date().toString(),
              status: true,
              capa: true,
            });

  }

  onComplete(e) {
    this.links = e.map(file => file.downloadURL);
    this.notifications.info('Upload completo!', `${this.links.length} imagens carregadas`, this.notifOptions);
  }

  onCompleteCapa(e) {
    this.linksCapa = e.map(fileCapa => fileCapa.downloadURL);
    this.notifications.info('Upload da capa completo!', `${this.linksCapa.length} imagens carregada.`, this.notifOptions);

  }

  onProgress(e) {
    this.progress = e;
  }
  onProgressCapa(e) {
    this.progressCapa = e;
  }

  onRemove(e: FileItem) {
    const message = 'Imagen removida. ' +  e.state.name;
    this.notifier.display('alert', message);
  }

  onCancel(e: FileItem) {
    this.notifications.info('Upload cancelado!', e.state.name, this.notifOptions);
  }

  onError(e) {
    this.notifications.error('Error!', e.message, this.notifOptions);
  }

  onReset() {
    this.notifications.alert('Limpo!', 'Todos os itens foram removidos', this.notifOptions);
  }

  onActive(e) {
    this.active = e;
  }

}
