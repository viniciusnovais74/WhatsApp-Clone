export class Format {

    //metodo statico getCamelCase
    static getCamelCase(text) {

        let div = document.createElement('div');
//Aqui inserindo a tag div com o ${text} definido como id na div

        div.innerHTML = `<div data-${text}="id"></div>`;

        //retorna objeto com a chave referente a posição 0
        return Object.keys(div.firstChild.dataset)[0];

    }

    static toTime(duration) {

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24)

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

    }

    static dateToTime(date, _locale = 'pt_BR'){

        return date.toLocaleTimeString(this._locale, {
            hours: '2-digit',
            minutes: '2-digit'
        });
    }

    static timeStamptoTime(timeStamp){

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format. dateToTime(timeStamp.toDate()): '';

    }
}