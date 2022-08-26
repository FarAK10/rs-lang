import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit {
  soundIcon: string = 'volume_mute';

  isMute: boolean = false;

  isFullScreen: boolean = false;

  fullScreen: string = 'fullscreen';

  @Output() muteChange = new EventEmitter<boolean>();

  @Output() screenSizeChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onMute() {
    if (this.isMute) {
      this.soundIcon = 'volume_mute';
    } else {
      this.soundIcon = 'volume_off';
    }
    this.isMute = !this.isMute;
    this.muteChange.emit(this.isMute);
  }

  onFullScreen() {
    if (this.isFullScreen) {
      this.fullScreen = 'fullscreen';
    } else {
      this.fullScreen = 'fullscreen_exit';
    }
    this.isFullScreen = !this.isFullScreen;
    this.screenSizeChange.emit(this.isFullScreen);
  }
}
