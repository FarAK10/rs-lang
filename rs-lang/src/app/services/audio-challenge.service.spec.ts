import { TestBed } from '@angular/core/testing';

import { AudioChallengeService } from './audio-challenge.service';

describe('AudioChallengeService', () => {
  let service: AudioChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
