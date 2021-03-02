import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WijnFB';
 cookieMessage = 'Deze website maakt gebruik van cookies om uw surfervaring te verbeteren. Door verder te surfen op deze site accepteert u de voorwaarden!';
 cookieDismiss = 'Got it!';
 cookieLinkText = '';

  ngOnInit(): void{
    const cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969'
        },
        button: {
          background: '#ffe000',
          text: '#164969'
        }
      },
      theme: 'classic',
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
        link: this.cookieLinkText,
        href: ''
      }
    });
  }
}
