import { Injectable } from '@angular/core';

import { Howl } from 'howler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoundManagerService {
  backgroundMusic: Howl;
  backgroundPaused = true;

  loadedSounds: BehaviorSubject<number> = new BehaviorSubject(0);

  muted: boolean;

  sound: any;

  constructor() {
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Howl({
        src: ['assets/sounds/bg-music.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.13,
        onload: () => this.loadedSounds.next(this.loadedSounds.getValue() + 1),
      });

      this.sound = {};
    }
  }

  get sounds() {
    return this.loadedSounds;
  }

  stopBackgroundMusic() {
    this.backgroundPaused = true;
    this.backgroundMusic.pause();
  }

  playBackgroundMusic() {
    if (this.backgroundPaused && !this.muted) {
      this.backgroundPaused = false;

      this.backgroundMusic.play();
    }
  }

  mute() {
    this.stopBackgroundMusic();
    this.muted = true;
  }

  unmute() {
    this.muted = false;
    this.playBackgroundMusic();
  }

  stopAllSounds() {
    this.sound.win.stop();
  }

  playSoundByPath(path: string) {
    this.sound[path].play();
  }

  isBgMusicOn(): boolean {
    return localStorage.getItem('musicOn') === 'true';
  }
}
