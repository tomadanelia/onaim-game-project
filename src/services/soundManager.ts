import { Howl } from 'howler';

class SoundManager {
    private sounds: Map<string, Howl> = new Map();
    private isMuted: boolean = false;

    constructor() {
        this.loadSounds();
    }

    loadSounds(): void {
        const soundConfigs = [
            { name: 'click', src: '/assets/sounds/click.wav' },
            { name: 'roll', src: '/assets/sounds/roll.wav' },
            { name: 'collect', src: '/assets/sounds/collect.wav' },
            { name: 'bonus', src: '/assets/sounds/bonus.wav' },
        ];

        soundConfigs.forEach(config => {
            const howl = new Howl({
                src: [config.src],
                volume: 0.5,
                onloaderror: ( error) => {
                    console.warn(`Failed to load sound: ${config.name}`, error);
                }
            });

            this.sounds.set(config.name, howl);
        });
        const roll = new Howl({
        src: ['/assets/sounds/roll.mp3.wav'],
        volume: 0.5,
        sprite: {
            roll1: [0, 1000],
         roll2: [2000, 3000],

        }
    });
    this.sounds.set('roll', roll);

        console.log('Sounds loaded');
    }

    play(soundName: string): void {
    if (this.isMuted) return;
    const sound = this.sounds.get(soundName);
    if (!sound) return;

    if (soundName === 'roll') {
        const rolls = ['roll2', 'roll1'];
        const random = rolls[Math.floor(Math.random() * rolls.length)];
        sound.play(random);
    } else {
        sound.play();
    }
}
    stop(soundName: string): void {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.stop();
        }
    }

    toggleMute(): void {
        this.isMuted = !this.isMuted;
        
        this.sounds.forEach(sound => {
            sound.mute(this.isMuted);
        });
    }

    setVolume(soundName: string, volume: number): void {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.volume(volume);
        }
    }

    setGlobalVolume(volume: number): void {
        this.sounds.forEach(sound => {
            sound.volume(volume);
        });
    }
}

export const soundManager = new SoundManager();