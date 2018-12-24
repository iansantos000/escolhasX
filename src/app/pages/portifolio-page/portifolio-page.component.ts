import { Component, OnInit, Input, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as firebase from 'firebase';
import { UserService } from 'src/app/shared/user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyFireService } from '../../shared/my-fire.service';


const DEFALT_IMAGES =
  'https://media.wired.com/photos/59268c5dcfe0d93c474309a2/master/w_1300,c_limit/BSP_054.jpg';

@Component({
  selector: 'app-portifolio-page',
  templateUrl: './portifolio-page.component.html',
  styleUrls: ['./portifolio-page.component.scss'],
})

export class PortifolioPageComponent implements OnInit {

  name: string;
  uid: string;
  email: string;

  portifoliosNamesRef: any;
  portifoliosNameList: any = [];
  nomePortifolio: any;

  portifolioDataRef: any;
  portifolioData: any = [];
  portifolioCapaDataRef: any;
  portifolioCapaData: any = [];

  portifoliosData: any;

  constructor(  private userService: UserService,
                private afs: AngularFirestore,
                private myFire: MyFireService
  ) {
    // this.notesCollection = this.afs.collection('WOVMLNTu9SU2n5bk4tAOBGNMjhm1', (ref) => ref.orderBy('desc').limit(5));
   }


  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      const user = this.userService.getProfile();
      if (user && user.name) {
        this.name = user.name;
        this.email = user.email;
        this.uid = user.uid;
      this.getPortifolioNamesTeste();
      // this.getPortifolioNames(this.uid);
      // this.getPortifolios();
      // this.getCapaPortifolios();
      }
    });

  }

  getPortifolioNamesTeste() { // retorna [ nome dos portifolios ]
    this.portifoliosNamesRef = firebase .database()
                                        .ref(this.uid)
                                        .child('PORTIFOLIOS')
                                        .child('NOMEDOENSAIO').ref;
  this.portifoliosNamesRef.once('value')
                          .then(snapshot => {
                            this.nomePortifolio = snapshot.val();
                            console.log('TESTE: ', this.nomePortifolio);
                            console.log('TESTE:2 ', this.nomePortifolio.key);
                          });
  }


  getPortifolioNames(uid) { // retorna [ nome dos portifolios ]
    this.portifoliosNamesRef = this.myFire.getPortifolioNameRef(this.uid);
    this.portifoliosNamesRef.on('child_added', data => {
    this.portifoliosNameList.push({
        key: data.key,
        data: data.val(),
        length: length,
      });
    });
    this.nomePortifolio = this.portifoliosNameList;
    console.log('NameList: ', this.nomePortifolio);
  }

  getPortifolios() {  // retorna [ dados do portifolio atravez do nome dele {getPortifolioNames()} ]

    for (let index = 0; index < this.portifoliosNameList; index++) {
      const element = this.portifoliosNameList[index];
      console.log('LIST: ', element);

    }

    this.portifolioDataRef = firebase .database()
                                      .ref(this.uid)
                                      .child('PORTIFOLIOS')
                                      .child('NOMEDOENSAIO')
                                      .child('CAPA');
    this.portifolioDataRef.on('child_added', data => {
    this.portifolioData.push({
        key: data.key,
        data: data.val(),
        imagem: data.val().imagens,
        capa: data.val().capa,
      });
    });
    console.log('DATA', this.portifolioData);
  }

  getCapaPortifolios() {  // retorna img CAPA [ dados do portifolio atravez do nome dele {getPortifolioNames()} ]
    this.portifolioDataRef = firebase .database()
                                      .ref(this.uid)
                                      .child('PORTIFOLIOS')
                                      .child('NOMEDOENSAIOteste');
    this.portifolioDataRef.on('child_added', data => {
    this.portifolioCapaData.push({
        key: data.key,
        key2: data.key,
        data: data.val(),
        imagem: data.val().imagens,
        status: data.val().status,
        capa: data.val().capa,
      });
    });

    // this.portifoliosData = this.portifolioCapaData;

    console.log('CAPA', this.portifolioCapaData);
    if (this.portifolioCapaData.key !== 'CAPA') {
      console.log('IF2: ', this.portifolioCapaData.key);
    } else {
      console.log('Nao localizado');
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(  event.container.data,
                        event.previousIndex,
                        event.currentIndex
                        );
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
                        );
    }
  }

}
