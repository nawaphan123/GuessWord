import { Component } from '@angular/core';

@Component({
  selector: 'app-word-card-page',
  imports: [],
  templateUrl: './word-card-page.html',
  styleUrl: './word-card-page.css',
})
export class WordCardPage {
  isFlipped = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
  opensound(){
    this.isFlipped = true;
    const text = "HELLO";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

}
