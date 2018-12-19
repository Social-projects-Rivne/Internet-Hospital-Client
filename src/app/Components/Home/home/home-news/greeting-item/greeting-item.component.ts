import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, keyframes, trigger } from '@angular/animations';
import { Greeting, TextWithPosition, ButtonPosition } from 'src/app/Models/Greeting';
const TIME_FOR_CHANGE_CONTAINER = 12000;

@Component({
  selector: 'app-greeting-item',
  templateUrl: './greeting-item.component.html',
  styleUrls: ['./greeting-item.component.scss'],
  animations: [
    trigger('textAppearing', [
      state('showText', style({opacity: 1})),
      state('hideText', style({opacity: 0})),
      transition('hideText => showText', animate('1500ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0}),
        style({transform: 'scale3d(0.6, 0.6, 0.6)', offset: 0.2}),
        style({transform: 'scale3d(0.9, 0.9, 0.9)', offset: 0.4}),
        style({opacity: 1, transform: 'scale3d(1.03, 1.03, 1.03)', offset: 0.6}),
        style({transform: 'scale3d(0.97, 0.97, 0.97)', offset: 0.8}),
        style({opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 1})
      ]))),
      transition('showText => hideText', animate('1500ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({transform: 'scale3d(0.9, 0.9, 0.9)', offset: 0.2}),
        style({opacity: 1, transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.5}),
        style({opacity: 1, transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.55}),
        style({opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 1}),
      ])))
    ]),
    trigger('textFromLeft', [
      state('showText', style({opacity: 1})),
      state('hideText', style({opacity: 0})),
      transition('hideText => showText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({opacity: 0, transform: 'translate3d(-3000px, 0, 0)', offset: 0}),
        style({opacity: 1, transform: 'translate3d(25px, 0, 0)', offset: 0.6}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.75}),
        style({transform: 'translate3d(5px, 0, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1}),
      ]))),
      transition('showText => hideText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({transform: 'translate3d(20px, 0, 0)', offset: 0.2}),
        style({opacity: 0, transform: 'translate3d(-2000px, 0, 0)', offset: 1}),
      ])))
    ]),
    trigger('textFromRight', [
      state('showText', style({opacity: 1})),
      state('hideText', style({opacity: 0})),
      transition('hideText => showText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({opacity: 0, transform: 'translate3d(3000px, 0, 0)', offset: 0}),
        style({opacity: 1, transform: 'translate3d(-25px, 0, 0)', offset: 0.6}),
        style({transform: 'translate3d(10px, 0, 0)', offset: 0.75}),
        style({transform: 'translate3d(-5px, 0, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1})
      ]))),
      transition('showText => hideText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({transform: 'translate3d(-20px, 0, 0)', offset: 0.2}),
        style({opacity: 0, transform: 'translate3d(2000px, 0, 0)', offset: 1}),
      ])))
    ]),
    trigger('textFromBottom', [
      state('showText', style({opacity: 1})),
      state('hideText', style({opacity: 0})),
      transition('hideText => showText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({opacity: 0, transform: ' translate3d(0, -3000px, 0)', offset: 0}),
        style({opacity: 1, transform: 'translate3d(0, 25px, 0)', offset: 0.6}),
        style({transform: 'translate3d(0, -10px, 0)', offset: 0.75}),
        style({opacity: 1, transform: 'translate3d(0, 5px, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1})
      ]))),
      transition('showText => hideText', animate('1000ms cubic-bezier(.33,.77,.15,.92)', keyframes([
        style({transform: 'translate3d(0, 10px, 0)', offset: 0.2}),
        style({opacity: 1, transform: 'translate3d(0, -20px, 0)', offset: 0.4}),
        style({opacity: 1, transform: 'translate3d(0, -20px, 0)', offset: 0.45}),
        style({opacity: 0, transform: 'translate3d(0, 2000px, 0)', offset: 1}),
      ])))
    ]),
    trigger('textFromTop', [
      state('showText', style({opacity: 1})),
      state('hideText', style({opacity: 0})),
      transition('hideText => showText', animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
        style({opacity: 0, transform: ' translate3d(0, 3000px, 0)', offset: 0}),
        style({opacity: 1, transform: 'translate3d(0, -20px, 0)', offset: 0.6}),
        style({transform: 'translate3d(0, 10px, 0)', offset: 0.75}),
        style({opacity: 1, transform: 'translate3d(0, -5px, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1})
      ]))),
      transition('showText => hideText', animate('1000ms cubic-bezier(.33,.77,.15,.92)', keyframes([
        style({transform: 'translate3d(0, -10px, 0)', offset: 0.2}),
        style({opacity: 1, transform: 'translate3d(0, 20px, 0)', offset: 0.4}),
        style({opacity: 1, transform: 'translate3d(0, 20px, 0)', offset: 0.45}),
        style({opacity: 0, transform: 'translate3d(0, -2000px, 0)', offset: 1}),
      ])))
    ])
  ],
})

export class GreetingItemComponent implements OnInit {

  currentContainer = 0;

  timers = {
    slider: 0,
    greeting: 0,
    informationAboutSite: 0,
    informationAboutUsers: 0,
    registerButton: 0
  };

  animationDelay = {
    greeting: 1000,
    informationAboutSite: 1000,
    informationAboutUsers: 1000,
    registerButton: 1000
  };

  animationShowing = {
    greeting: true,
    informationAboutSite: true,
    informationAboutUsers: true,
    registerButton: true
  };

  greetings = [];

  constructor() { }

  ngOnInit() {
    this.setPlay();

    let greeting = new Greeting();
    greeting.greeting = new TextWithPosition('Hello!', 40, null, null, 45);
    greeting.aboutSite = new TextWithPosition('You visited our platform to find a doctor, didn\'t you?', 55, 15, null, 45);
    greeting.aboutUsers = new TextWithPosition('There are more than 1000 verified doctors on our platform!', 70, 15, null, 45);
    greeting.imageUrl = '../../../../../../assets/img/greeting-image-1.jpg';
    greeting.registerButton = new ButtonPosition(79, 20, null, null);
    this.greetings.push(greeting);

    greeting = new Greeting();
    greeting.greeting = new TextWithPosition('Hello!', 10, null, null, 5);
    greeting.aboutSite =
      new TextWithPosition('You are doctor and you want to increase number of your clients, aren\'t you?', 30, null, null, 5);
    greeting.aboutUsers =  new TextWithPosition('There are more than 10000 verified users on our platform!', 50, null, null, 5);
    greeting.imageUrl = '../../../../../../assets/img/greeting-image-2.jpg';
    greeting.registerButton = new ButtonPosition(null, null, 10, 20);
    this.greetings.push(greeting);
  }

  setPlay() {
    this.timers.slider = window.setTimeout(() => {
      this.nextContainer();
      this.setTimersForTextShowing();
    }, TIME_FOR_CHANGE_CONTAINER);
  }

  setTimersForTextShowing() {
    this.timers.greeting = window.setTimeout(() => {
      this.animationShowing.greeting = true;
    }, this.animationDelay.greeting);

    this.timers.informationAboutSite = window.setTimeout(() => {
      this.animationShowing.informationAboutSite = true;
    }, this.animationDelay.informationAboutSite);

    this.timers.informationAboutUsers = window.setTimeout(() => {
      this.animationShowing.informationAboutUsers = true;
    }, this.animationDelay.informationAboutUsers);

    this.timers.registerButton = window.setTimeout(() => {
      this.animationShowing.registerButton = true;
    }, this.animationDelay.registerButton);
  }

  previousContainer() {
    this.clearTimers();
    this.hideText();

    this.currentContainer = this.currentContainer !== 0 ? this.currentContainer - 1 : this.greetings.length - 1;

    this.setTimersForTextShowing();

    this.setPlay();
  }

  hideText() {
    for (const showState in this.animationShowing) {
      if (this.animationShowing.hasOwnProperty(showState)) {
        this.animationShowing[showState] = false;
      }
    }
  }

  nextContainer() {
    this.clearTimers();
    this.hideText();

    this.currentContainer = this.currentContainer !== this.greetings.length - 1 ? this.currentContainer + 1 : 0;

    this.setTimersForTextShowing();

    this.setPlay();
  }

  clearTimers() {
    for (const timer in this.timers) {
      if (this.timers.hasOwnProperty(timer)) {
        window.clearTimeout(this.timers[timer]);
      }
    }
  }
}
