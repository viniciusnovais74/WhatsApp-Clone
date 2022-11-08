const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {

    constructor() {

        this._config = {
            
        };

        this.init();
    }


    init() {

        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }

    //metodo statico db() que busca o firebase pelo metodo firestore
    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

    initAuth() {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken
                    let user = result.user;

                    s({
                        user,
                        token
                    });

                }).catch(err => {
                    f(err);
                });
        });

    }

}