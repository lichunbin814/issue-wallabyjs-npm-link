import { Component } from '@angular/core';
import { ShareService } from 'share-module/src/app/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public shareService: ShareService
  ) {

  }
}
