import { ClassEvent } from "../utils/ClassEvent";
import { Format } from "../utils/Format";
export class MicrophoneController extends ClassEvent {

    constructor() {

        super();

        this._available = false;

        this._mimeType = 'audio/webm';

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._available = true;

            this._stream = stream;

            this.trigger('ready', {
                stream: this._stream,
                audio: this._audio
            });

        }).catch(err => {

            console.error(err);

        });

    }

    isAvailable() {

        return this._available;

    }

    stop() {

        if (this.isAvailable) {
            this._stream.getTracks().forEach(track => {
                track.stop();
            });

            this.trigger('stop');
        }
    }

    startRecorder() {

        if (this.isAvailable()) {

            this._mediaRecoreder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecoreder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) {
                    this._recordedChunks.push(e.data);
                }

            });

            this._mediaRecoreder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

                console.log('file', file);

                let reader = new FileReader();

                reader.onload = e => {

                    console.log(file)

                    let audio = new Audio(reader.result);

                    audio.play()

                }

                reader.readAsDataURL(file);

            });

            this._mediaRecoreder.start();
            this.startTimer
        }

    }

    play() {

        if (this.isAvailable) {
            this._audio = new Audio();

            this._audio.srcObject = MediaStream(this._stream);

            this._audio.play();
            this.trigger('play', {
                stream: this._stream,
                audio: this._audio
            });
        }
    }

    stopRecorer() {

        if (this.isAvailable()) {

            this._mediaRecoreder.stop();
            this.stop();
            this.stopTimer();
        }

    }

    startTimer() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordTimer', (Date.now() - start))
            
        }, 100);
    }

    stopTimer() {

        clearInterval(this._recordMicrophoneInterval);

    }
}