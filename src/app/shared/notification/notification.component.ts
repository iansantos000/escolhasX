import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  type: string = null;
  message: string = null;

  constructor(  private notifier: NotificationService,
                private toastService: MzToastService,
    ) {
    notifier.emmitter.subscribe(
      data => { // Toast carregado na pagina com mensagens de erro ou sucesso.
        switch (data.type) {
          case 'success':
            this.type = 'green';
            break;
          case 'error':
            this.type = 'red';
            break;
          default:
          this.type = 'blue';
          break;
        }
       // this.type = data.type;
       this.message = data.message;
       this.toastService.show(this.message , 4000, this.type);
       console.log(this.type);
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


