import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})

export class MainNavComponent implements OnInit {
  isLoggedIn = false;
  name: string;
  uid: string;
  email: string;
  avatar: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(  private breakpointObserver: BreakpointObserver,
                private userService: UserService,
                private router: Router
                ) {}

  ngOnInit() {

    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        console.log(userData);
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
        this.avatar = userData.photoUrl;
      } else {
        this.name = null;
        this.email = null;
        this.uid = null;
        this.avatar = null;
      }
    });

    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
        const user = this.userService.getProfile();
        if (user && user.name) {
          this.name = user.name;
          this.email = user.email;
          this.uid = user.uid;
          this.avatar = user.avatar;
        }
        this.router.navigate(['/contato']);
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    firebase.auth().signOut()
      .then(() => {
         this.userService.destroy();
         this.isLoggedIn = false;
      });
  }


}
