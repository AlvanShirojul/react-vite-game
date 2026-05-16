
// This file handles audio playback for the game.
// It uses the Web Audio API for better performance and control over sounds.

// Base64 encoded WAV audio data for various game sound effects.
const SOUNDS_DATA = {
  dice: 'data:audio/wav;base64,UklGRlgBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhVwEAAH5/f3+Af4F/hYCGgIeAiYCOgI6AjoCOf4x/in+Kf4h/g39/f3p7e3x8fH19fX5+fn5+fnx8fHp6enx8fHx8fHx8fHx8fH19fX5+foCAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiIiIiIeHh4aGhYWFhISEg4ODgoKChoaGh4eHiIiJiYmKiYqJioqKiYqJiYmIiYeHhoaGhoWFhYSEhIODg4KCgoGBgYCAgH5+fn19fXx8fHp6enp6fHx8fHx8fX19fn5+gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiJiYmKiYqLi4uMjIyNjY2Ojo6Pj5CQkJCQj4+Ojo2NjYyMjIuLi4qJioiIiYeHhoaGg4ODgoKCAAAAAA==',
  move: 'data:audio/wav;base64,UklGRkoAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhRgAAAEBAQEBAQEBAPz49PTs6OTg3NjU0MzIxMC8uLSwqKCcmJSQjIiEgHx0cGxoZGBcWFRQTEhEQDw4NCwsKCQgHBgUEAwIBAAAAAA==',
  ladder: 'data:audio/wav;base64,UklGRkQBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhQAEAAIA/Pj08Ozo5ODc2NTQzMjEwMC8uLSwqKCcmJSQjIiEgHx0cGxoZGBcWFRQTEhEQDw4NCwsKCQgHBgUEAwIBAEBAQEBAQEBAPz49PTs6OTg3NjU0MzIxMC8uLSwqKCcmJSQjIiEgHx0cGxoZGBcWFRQTEhEQDw4NCwsKCQgHBgUEAwIBAA==',
  snake: 'data:audio/wav;base64,UklGRkQBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhQAEAAEBAPz49PTs6OTg3NjU0MzIxMC8uLSwqKCcmJSQjIiEgHx0cGxoZGBcWFRQTEhEQDw4NCwsKCQgHBgUEAwIBAAAAAACAPz49PTs6OTg3NjU0MzIxMC8uLSwqKCcmJSQjIiEgHx0cGxoZGBcWFRQTEhEQDw4NCwsKCQgHBgUEAwIBAA==',
  correct: 'data:audio/wav;base64,UklGRjABAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhfAAAAH9/f3+AgYGBg4ODiIiJiYqKi4yMjY2Ojo+Pj5CQkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8A',
  incorrect: 'data:audio/wav;base64,UklGRlwBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhWAEAAH8AAH4AAH0AAB0AACEAABgAACEAABsAACYAAAUAAFAAAAYAAEUAAAMAAIYAAAUAAIMAAAEAAIYAAAEAAIEAAAEAAIAAAAEAAH8AAAEAAH4AAAEAAH0AAAEAAHwAAAEAAHsAAAEAAHoAAAEAAHkAAAEAAHgAAAEAAHcAAAEAAHYAAAEAAHUAAAEAAHQAAAEAAHM=',
  win: 'data:audio/wav;base64,UklGRsQBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhqAEAAAAAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==',
  click: 'data:audio/wav;base64,UklGRkoAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhRgAAAENafoN/iICEgIOAhYB+fXx7enh3dXBubWppaGVgXVtZWFhYV1dVVVNTUlFQT05NTEtJR0VEQ0JAPz49PDs6OTg3NjU0MzIxMC8uLSwqKCcmJSQjIg==',
  question: 'data:audio/wav;base64,UklGRkAAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhPAAAAG9vc3R2d3h5e3x9fX5+fn5+fn19fHx8e3t7e3x8fH19fn5+gYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiIiHh4eGhoWFhYSEhIODg4KCgoGBgYCAgH5+fn19fHx7e3g=',
};

let audioContext: AudioContext;
let isMuted = false;
const audioBuffers: { [key: string]: AudioBuffer } = {};
let isInitialized = false;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Function to decode audio data
const decodeAudioData = async (base64: string, context: AudioContext): Promise<AudioBuffer> => {
    const response = await fetch(base64);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
};

// Initialize all sounds after a user gesture
export const initSounds = async () => {
    if (isInitialized) return;
    const context = getAudioContext();
    if (context.state === 'suspended') {
        await context.resume();
    }
    await Promise.all(Object.entries(SOUNDS_DATA).map(async ([key, data]) => {
        audioBuffers[key] = await decodeAudioData(data, context);
    }));
    isInitialized = true;
};

export type SoundType = keyof typeof SOUNDS_DATA;

export const playSound = (type: SoundType) => {
    const context = getAudioContext();
    if (!isInitialized || isMuted || !audioBuffers[type]) return;

    if (context.state === 'suspended') {
        context.resume();
    }
    
    const source = context.createBufferSource();
    source.buffer = audioBuffers[type];
    source.connect(context.destination);
    source.start(0);
};

export const toggleMute = (): boolean => {
    isMuted = !isMuted;
    return isMuted;
};

export const getMuteState = (): boolean => isMuted;
