import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from "../../message/message";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public messages: [Message];

    constructor(public navCtrl: NavController) {
        this.messages = [
            new Message("Hello there!", true),
            new Message("Hi Kevin", false),
            new Message("How are you?", true),
            new Message("I am good, fine?", false)
        ];
    }

    public onKeyUp(pressedKey) {
        const returnKeyKeyCode = 13;
        if (pressedKey.keyCode == returnKeyKeyCode) {
            // stuff to do
        }
    }

}
