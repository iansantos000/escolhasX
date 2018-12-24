import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
  type: string = null;
  message: string = null;

  constructor(private notifier: NotificationService) {
    notifier.emmitter.subscribe(
      data => {
       this.type = data.type;
       this.message = data.message;
       this.reset();
      }
    );
  }

  reset() {
    setTimeout(() => {
     this.type = null;
     this.message = null;
    }, 6000);
  }

  ngOnInit() {
  }

}

