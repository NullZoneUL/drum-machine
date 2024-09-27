import { CustomEventNames, publishEvent } from '@utils/event';
import { AudioManager } from '@utils/audio-manager';
import { playMetronome, stopMetronome } from '@components/metronome/service';

jest.mock('@assets/sounds/metronome-tick.mp3', () => 'mockMetronomeSound');
jest.mock('@utils/audio-manager');

describe('Metronome', () => {
  const playSoundMock = jest.fn();
  jest
    .spyOn(AudioManager.prototype, 'playSound')
    .mockImplementation(playSoundMock);

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should start playing the metronome', () => {
    playMetronome();
    expect(playSoundMock).not.toHaveBeenCalled();
  });

  it('Should stop playing the metronome', () => {
    stopMetronome();
    expect(playSoundMock).not.toHaveBeenCalled();
  });

  it('Should not play sound if metronome is stopped', () => {
    stopMetronome();

    publishEvent(CustomEventNames.generalTick, 0);
    publishEvent(CustomEventNames.generalTick, 20);

    expect(playSoundMock).not.toHaveBeenCalled();
  });
});
