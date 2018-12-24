import { NotificationService } from './../../shared/notification.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { MyFireService } from 'src/app/shared/my-fire.service';
import { UserService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }



  constructor(  private myFire: MyFireService,
                private userService: UserService,
                private router: Router,
                private notifier: NotificationService
                ) { }

  ngOnInit() {
  }


  onSubmitLogin (form: NgForm) {
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    // console.log('onSubmitLogin', email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          const message = 'Usuario logado com sucesso';
          this.notifier.display('success', message);
          return this.myFire.getUserFromDatabase(userData.user.uid);
        } else {
          const message = 'Seu e-mail nao foi verificado';
          this.notifier.display('error', message);
          console.log('Seu e-mail nao foi verificado');
          firebase.auth().signOut();
        }

      })
      .then(userDataFromDatabase => {
        if (userDataFromDatabase) {
          this.userService.set(userDataFromDatabase);
          this.router.navigate(['/']);
        }
      })
      .catch(err => {
        // this.notifier.display('error', err.message);
        console.log(err);
      });

  }

  onSubmitRegister(form: NgForm) {

    // tslint:disable-next-line:max-line-length
    const avatarDefaultUser = 'https://firebasestorage.googleapis.com/v0/b/escolhasfirebase.appspot.com/o/Users-Avatars%2FAvatar_padrao.png?alt=media&token=f84eddd6-9dc0-4f34-bdfd-b9df1932c0f3';
    const fullname = form.value.regUser;
    const email = form.value.regEmail;
    const password = form.value.regPassword;
    console.log (fullname);
    console.log (email);
    console.log (password);
    // console.log('onSubmit', fullname, email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userData => {
      userData.user.sendEmailVerification();

      const message = `A verification email has been sent to ${email}. kindly check your inbox and follow the steps
       in the verification email. Once verification is complete, please login to the application`;
      this.notifier.display('success', message);

      return firebase.database().ref('users/' + userData.user.uid).set({
        email: email,
        uid: userData.user.uid,
        registrationDate: new Date().toString(),
        name: fullname,
        photoUrl: avatarDefaultUser,
      })
        .then(() => {
          firebase.auth().signOut();
        });

    })
    .catch(err => {
      this.notifier.display('error', err);
      console.log('errorauth', err);
    });

  }

}
