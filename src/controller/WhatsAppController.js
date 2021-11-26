class WhatsAppController {

    constructor() {

        console.log('WhatsApp');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();

    }

    elementsPrototype() {

        Element.prototype.hide = function () {

            this.style.display = 'none';
            return this;

        }

        Element.prototype.show = function () {

            this.style.display = 'block';
            return this;

        }

        Element.prototype.toggle = function () {

            this.style.display = (this.style.display === 'none');
            return this;

        }

        Element.prototype.on = function (events, fn) {

            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
                return this;

            })
        }

        Element.prototype.css = function (styles) {

            for (let name in styles) {
                this.style[name] = styles[name]
            }
            return this;

        }

        Element.prototype.addClass = function (name) {

            this.classList.add(name);
            return this;

        }

        Element.prototype.removeClass = function (name) {

            this.classList.remove(name);
            return this;

        }

        Element.prototype.toggleClass = function (name) {

            this.classList.toggle(name);
            return this;

        }

        Element.prototype.hasClass = function (name) {

            return this.classList.contains(name);

        }

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this);

        }

        HTMLFormElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().forEach((value, key) => {

                json[key] = value;

            });

            return json;

        }

    }

    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        })
    }

    initEvents() {


        //1-Botão da Foto - Inicio
        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);


        });

        //1-A: Esse botão fecha o Painel de Ediçao::</|\>//
        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open');

        });

        //1-B+ Esse botão contem a edição de foto::</|\>//
        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click()

        })

        //1-B+ Esse botão confirma o envio de foto::</|\>//
        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key === 'Enter') {

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }

        });

        this.el.inputNamePanelEditProfile.on('click', e => {

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });



        //1-Botão da Foto - Final

        //Botão de Nova Conversa ou Novo Contato Inicio
        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        //Esse Botão Abaixo remove o painel de novo contato
        this.el.btnClosePanelAddContact.on('click', e => {

            this.el.panelAddContact.removeClass('open');

        })

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        });
        //Botão de New Chat or New Contact Final

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.on('click', e => {

                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });

            });

        });

        this.el.btnAttach.on('click', e => {

            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach())
        });

        this.el.btnAttachPhoto.on('click', e => {
            console.log('photo');

        });

        this.el.btnAttachCamera.on('click', e => {
            console.log('photo');
        });

        this.el.btnAttachDocument.on('click', e => {
            console.log('photo');
        });

        this.el.btnAttachPhoto.on('click', e => {
            console.log('photo');
        });
    }

    //Usado para fechar todos os painels abertos
    closeAllLeftPanel() {

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    }

    closeMenuAttach(e){

        doc
    }

}