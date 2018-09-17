import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import { MyFireService } from '../../shared/my-fire.service';
import { UserService } from '../../shared/user.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(  private notifier: NotificationService,
                private myFire: MyFireService,
                private userService: UserService,
                private router: Router,
                ) {}

  ngOnInit() {
  }

  onSubmitLogin (form: NgForm) {
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    // console.log('onSubmitLogin', email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          return this.myFire.getUserFromDatabase(userData.user.uid);
        } else {
          const message = 'Your email is not yet verified';
          this.notifier.display('error', message);
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
        this.notifier.display('error', err.message);
      });

  }

  onSubmitRegister(form: NgForm) {

    const fullname = form.value.regUser;
    const email = form.value.regEmail;
    const password = form.value.regPassword;

    // console.log('onSubmit', fullname, email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        // userData.sendEmailVerification();
        userData.user.sendEmailVerification();

        // const message = `A verification email has been sent to ${email}. kindly check your inbox and follow the steps
        //  in the verification email. Once verification is complete, please login to the application`;
        // this.notifier.display('success', message);

        return firebase.database().ref('users/' + userData.user.uid).set({
          email: email,
          uid: userData.user.uid,
          registrationDate: new Date().toString(),
          name: fullname
        })
          .then(() => {
            firebase.auth().signOut();
          });

      })
      .catch(err => {
        this.notifier.display('error', err.message);
        console.log('errorauth');
      });

  }

}
