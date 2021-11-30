export class ClassEvent {

    constructor() {

        this._event = {}

    }

    on(eventName, fn) {

        if (!this._event[eventName]) this._event[eventName] = new Array();

        this._event[eventName].push(fn)
    }

    trigger() {

        let args = [...arguments];
        let eventName = args.shift()

        args.push(new Event(eventName));

        if (this._event[eventName] instanceof Array) {
            this._event[eventName].forEach(fn => {

                fn.apply(null, args);

            });
        }
    }

}