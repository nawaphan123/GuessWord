import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//test
@Component({
  selector: 'app-word-card-page',
  imports: [CommonModule],
  templateUrl: './word-card-page.html',
  styleUrl: './word-card-page.css',
})
export class WordCardPage {
  constructor(private http: HttpClient) {}
  wordIndex = 0;
  word: [string, string][] = [];

  isFlipped = false;

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit() {
    this.http
      .get<[string, string][]>(
        'https://script.google.com/macros/s/AKfycbzYOcT7KYxTeh3vLemvRZni8fqO_FCdiXdiyVTpc_NFJRd6ha7v3C3Sn8ZMuO6rv2Q/exec'
      )
      .subscribe({
        next: (data) => {
          this.word = this.shuffle([...data]);
          this.wordIndex = 0;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
  opensound() {
    console.log(this.isFlipped);
    this.isFlipped = true;
    const utterance = new SpeechSynthesisUtterance(this.word[this.wordIndex][0]);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
  next() {
    if (this.isFlipped) {
      // 1. พลิกกลับก่อน
      this.isFlipped = false;

      // 2. รอ animation 0.8 วินาที
      setTimeout(() => {
        this.moveNext();
      }, 800);
    } else {
      this.moveNext();
    }
  }

  private moveNext() {
    if (this.wordIndex + 1 > this.word.length - 1) {
      this.wordIndex = 0;
    } else {
      this.wordIndex += 1;
    }
  }

  previous() {
    if (this.isFlipped) {
      this.isFlipped = false;

      setTimeout(() => {
        this.movePrevious();
      }, 800);
    } else {
      this.movePrevious();
    }
  }

  private movePrevious() {
    if (this.wordIndex - 1 > -1) {
      this.wordIndex -= 1;
    } else {
      this.wordIndex = this.word.length - 1;
    }
  }
  shuffleWord() {
    this.wordIndex = 1;
    this.previous();
    this.word = this.shuffle([...this.word]);
  }
}
