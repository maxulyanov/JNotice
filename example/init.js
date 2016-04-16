'use strict';

document.addEventListener('DOMContentLoaded', domReady);

function domReady() {


    var jbuttons = document.querySelectorAll('.js-run');
    for (var i = 0; i < jbuttons.length; i++) {
        var button = jbuttons[i];
        button.addEventListener('click', function (event) {
            event.preventDefault();
            var isDisabled = event.target.getAttribute('data-disabled');
            if(isDisabled) {
                return;
            }

            var action = event.target.getAttribute('data-action');
            if (action && action in jObjectFunctions) {
                jObjectFunctions[action](action, event.target);
            }
        })
    }

    var jnotice = new JNotice({
        saveLocalStorage: true,
    });
    jnotice.call();


    jnotice = new JNotice();
    var typeLastCreate = null;
    var jObjectFunctions = {

        'default': function () {
            jnotice.add({html: 'Hello world JNotice!', duration: 3000}).call();
        },
        'info': function () {
            jnotice.add({html: 'Welcome to the site!', type: 'info', duration: 3000}).call();
        },
        'success': function () {
            jnotice.add({html: 'Successful sending', type: 'success', duration: 3000}).call();
        },
        'warning': function () {
            jnotice.add({html: 'Connection is not secure', type: 'warning', duration: 3000}).call();
        },
        'error': function () {
            jnotice.add({html: 'Login failed!', type: 'error', duration: 3000}).call();
        },

        'left-top': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    position: {
                        x: 'left',
                        y: 'top'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Left top', type: 'info', duration: 3000}).call();
        },
        'center-top': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationHide: 'fadeOut',
                    position: {
                        x: 'center',
                        y: 'top'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Center top', type: 'info', duration: 3000}).call();
        },
        'right-top': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationHide: 'bounceOutRight',
                    position: {
                        x: 'right',
                        y: 'top'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Right top', type: 'info', duration: 3000}).call();
        },
        'left-bottom': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationHide: 'bounceOutLeft',
                    position: {
                        x: 'left',
                        y: 'bottom'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Left Bottom', type: 'success', duration: 3000}).call();
        },
        'center-bottom': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationHide: 'fadeOut',
                    position: {
                        x: 'center',
                        y: 'bottom'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Center Bottom', type: 'success', duration: 3000}).call();
        },
        'right-bottom': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationHide: 'bounceOutRight',
                    position: {
                        x: 'right',
                        y: 'bottom'
                    }
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This position: Right Bottom', type: 'success', duration: 3000}).call();
        },

        'bounceIn': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationShow: 'bounceIn',
                    animationHide: 'bounceOutLeft'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This animation show: bounceIn', type: 'info', duration: 3000}).call();
        },

        'bounceInLeft': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationShow: 'bounceInLeft',
                    animationHide: 'bounceOutLeft'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This animation show: bounceInLeft', type: 'info', duration: 3000}).call();
        },

        'bounceInRight': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    position: {
                        x: 'right'
                    },
                    animationShow: 'bounceInRight',
                    animationHide: 'bounceOutRight'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This animation show: bounceInRight', type: 'info', duration: 3000}).call();
        },

        'fadeIn': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    animationShow: 'fadeIn',
                    animationHide: 'fadeOut'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This animation show: fadeIn', type: 'success', duration: 3000}).call();
        },

        'bounceInDown': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    position: {
                        x: 'center'
                    },
                    animationShow: 'bounceInDown',
                    animationHide: 'fadeOut'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'This animation show: bounceInDown', type: 'success', duration: 3000}).call();
        },

        'events': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice();
            }
            typeLastCreate = type;
            jnotice.add({
                html: 'Search for messages in the console',
                type: 'info',
                duration: 3000,
                callbacks: {
                    show: function(event) {
                        console.log(event.type)
                    },
                    hide: function(event) {
                        console.info(event.type);
                        console.log('Hidden by user? ' + event.hideIsUser);
                    }
                }
            }).call();
        },

        'hot-to-add': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice();
            }
            typeLastCreate = type;
            jnotice.add([
                {html: 'First notification', type: 'info', duration: 3000},
                {html: 'Second notification', type: 'success', duration: 3000}
            ]).call();
        },

        'method-show': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    methodShow: 'queue'
                });
            }
            typeLastCreate = type;
            jnotice.add([
                {html: 'First notification', type: 'info', duration: 3000},
                {html: 'Second notification', type: 'success', duration: 3000},
                {html: 'Third notification', type: 'warning', duration: 3000},
                {html: 'Fourth notification', type: 'error', duration: 3000}
            ]).call();
        },


        'save-localstorage': function (type, target) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    saveLocalStorage: true
                });
            }
            target.className += ' disabled';
            target.setAttribute('data-disabled', true);
            typeLastCreate = type;
            jnotice.add({html: 'Close and open the tab!', type: 'info', duration: 3000}).call();
            setTimeout(function() {
               jnotice.add({html: 'I\'m from localStorage!', type: 'success', duration: 3000});
           }, 100);
        },

        'remove-to-click': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    removeToClick: true
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'Click on me to hide', type: 'error', duration: 3000}).call();
        },

        'remove-to-click-all': function (type) {
            if (type != typeLastCreate) {
                jnotice.destroy();
                jnotice = new JNotice({
                    removeToClickAll: true,
                    animationHide: 'fadeOut'
                });
            }
            typeLastCreate = type;
            jnotice.add({html: 'Click on me to hide all notification', type: 'error', duration: 3000}).call();
        }

    }

}