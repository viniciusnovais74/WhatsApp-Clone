const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyARRFeryejGFHA6zCVnKQfraNtFyfNHqP0",
            authDomain: "whatsapp-clone-10ced.firebaseapp.com",
            projectId: "whatsapp-clone-10ced",
            storageBucket: "whatsapp-clone-10ced.appspot.com",
            messagingSenderId: "218423464441",
            appId: "1:218423464441:web:47eba597bd132545c72d28"
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