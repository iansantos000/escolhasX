import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-escolhas-criar',
  templateUrl: './escolhas-criar.component.html',
  styleUrls: ['./escolhas-criar.component.scss']
})
export class EscolhasCriarComponent implements OnInit {

 // Main task
 task: AngularFireUploadTask;

 // Progress monitoring
 percentage: Observable<number>;

 snapshot: Observable<any>;

 // Download URL
 downloadURL: Observable<string>;

 // State for dropzone CSS toggling
 isHovering: boolean;

 uploads: any[];
 files: Observable<any>;


 constructor( private storage: AngularFireStorage,
              private db: AngularFirestore
              ) { }
  ngOnInit() {
    this.files = this.db.collection('filesDB').valueChanges();

  }


 toggleHover(event: boolean) {
   this.isHovering = event;
 }


 startUpload(event: FileList) {
   // The File object
   const file = event.item(0);

   // Client-side validation example
   if (file.type.split('/')[0] !== 'image') {
     console.error('unsupported file type :( ');
     return;
   }

   // The storage path
   const path = `ANGULAR7FIRE/${new Date().getTime()}_${file.name}`;
   const fileRef = this.storage.ref(path);
   // Totally optional metadata
   const customMetadata = { app: 'My AngularFire-powered PWA!' };
   // The main task
   this.task = this.storage.upload(path, file, { customMetadata });
   // Progress monitoring
   this.percentage = this.task.percentageChanges();
   this.snapshot   = this.task.snapshotChanges();

   // The file's download URL
   // this.downloadURL = path.getDownloadURL();
   this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      )
      .subscribe();
      console.log('this.downloadURL', this.downloadURL);
    // this.task.snapshotChanges

   this.snapshot = this.task.snapshotChanges().pipe(
     tap(snap => {
       if (snap.bytesTransferred === snap.totalBytes) {
         // Update firestore on completion
         this.db.collection('ANGULAR7FIRE').add({
           path,
           size: snap.totalBytes,
          });
         console.log(path);
         console.log(snap.totalBytes);
       }
     })
   ); // this.snapshot
 }

 importImages(event) {
  // reset the array
  this.uploads = [];
  const filelist = event.target.files;
  const allPercentage: Observable<number>[] = [];

  for (const file of filelist) {

      // The storage path
   const path = `ANGULAR7FIREmult/${new Date().getTime()}_${file.name}`;
   const fileRef = this.storage.ref(path);
   // Totally optional metadata
   const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // The main task
   this.task = this.storage.upload(path, file, { customMetadata });

   const _percentage$ = this.task.percentageChanges();
    allPercentage.push(_percentage$);

    // crie um objeto composto com informações diferentes.
    // ADAPTE-SE DE ACORDO COM SUA NECESSIDADE
    const uploadTrack = {
      fileName: file.name,
      percentage: _percentage$
    };

    // empurrar cada upload para o array
    this.uploads.push(uploadTrack);

    // para cada upload, faça o que quiser no firestore com o arquivo enviado
    const _t = this.task.then((f) => {
      return f.ref.getDownloadURL().then((url) => {
        return this.db.collection('filesMULTXX9').add({
          name: f.metadata.name,
          url: url
        });
      });
    });

    // The file's download URL
   // this.downloadURL = path.getDownloadURL();
   this.task.snapshotChanges().pipe(
    finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
    .subscribe();
    console.log('this.downloadURL', this.downloadURL);
  // this.task.snapshotChanges

 this.snapshot = this.task.snapshotChanges().pipe(
   tap(snap => {
     if (snap.bytesTransferred === snap.totalBytes) {
       // Update firestore on completion
       this.db.collection('ANGULAR7FIREmult').add({ path, size: snap.totalBytes });
       console.log(path);
       console.log(snap.totalBytes);
     }
   })
 ); // this.snapshot

  } // for

  this.percentage = combineLatest(allPercentage)
    .pipe(
    map((percentages) => {
      let result = 0;
      for (const percentage of percentages) {
        result = result + percentage;
      }
      return result / percentages.length;
    }),
    tap(console.log)
    );

}



 // Determines if the upload task is active
 isActive(snapshot) {
   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
 }
 importImagesBK(event) {
  // reset the array
  this.uploads = [];
  const filelist = event.target.files;
  const allPercentage: Observable<number>[] = [];

  for (const file of filelist) {

    const path = `files/${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    const _percentage$ = task.percentageChanges();
    allPercentage.push(_percentage$);

    // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
    const uploadTrack = {
      fileName: file.name,
      percentage: _percentage$
    };

    // push each upload into the array
    this.uploads.push(uploadTrack);

    // for every upload do whatever you want in firestore with the uploaded file
    const _t = task.then((f) => {
      return f.ref.getDownloadURL().then((url) => {
        return this.db.collection('filesBD').add({
          name: f.metadata.name,
          url: url,
          iten: 'item outro'
        });
      });
    });

  }

  this.percentage = combineLatest(allPercentage)
    .pipe(
    map((percentages) => {
      let result = 0;
      for (const percentage of percentages) {
        result = result + percentage;
      }
      return result / percentages.length;
    }),
    tap(console.log)
    );

}
}
