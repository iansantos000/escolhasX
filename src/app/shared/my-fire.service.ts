import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MyFireService {

  constructor(private user: UserService) {}

  getUserFromDatabase(uid) {

    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());

  }

  generateRandomName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName();
    const fileRef = firebase.storage().ref().child('TESTEimage/' + fileName);
    const uploadTask = fileRef.put(file);

    return new Promise((resolve, reject) => {

      uploadTask.on('state_changed', snapshot => {
      }, error => {
        console.log('upLoadTask.on: Error');
        reject(error);
      }, () => {
        console.log('upLoadTask.on: ()');
        const fileUrl =  uploadTask.snapshot.downloadURL;
        resolve({fileName, fileUrl});
      });

    });

  }

  handleImageUpload(data) {

    const user = this.user.getProfile();

    const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
    const personalPostDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString()
    };

    const allPostKey = firebase.database().ref('allposts').push().key;
    const allPostsDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user
    };

    const imageDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user,
      favoriteCount: 0
    };

    const updates = {};
    updates['/myposts/' + user.uid + '/' + newPersonalPostKey ] = personalPostDetails;
    updates['/allposts/' + allPostKey] = allPostsDetails;
    updates['/images/' + data.fileName] = imageDetails;

    return firebase.database().ref().update(updates);

  }

  getPortifolioNameRef(uid) {
    return firebase.database().ref(uid).child('PORTIFOLIOS');
  }

  handleFavoriteClicked(imageData) {

    const uid = firebase.auth().currentUser.uid;

    const updates = {};

    updates['/images/' + imageData.name + '/oldFavoriteCount'] = imageData.favoriteCount;
    updates['/images/' + imageData.name + '/favoriteCount'] = imageData.favoriteCount + 1;
    updates['/favorites/' + uid + '/' + imageData.name] = imageData;

    return firebase.database().ref().update(updates);

  }

  followUser(uploadedByUser) {
    const uid = firebase.auth().currentUser.uid;

    const updates = {};
    updates['/follow/' + uid + '/' + uploadedByUser.uid] = true;

    return firebase.database().ref().update(updates);

  }

}
