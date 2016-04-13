/*
 * JNotice: javascript notification in the browser
 * 1.0.0
 *
 * By Max Ulyanov
 * Src: https://github.com/M-Ulyanov/JNotice
 * Example https://m-ulyanov.github.io/jnotice/
 */


;(function () {

    'use strict';

    // Package
    var util = new Utils();

    function JNotice(userOptions) {

        var defaultOptions = {
            methodShow: 'queue1',
            removeToClick: true,
            removeToClickAll: false,
            saveLocalStorage: false,
            animationShow: 'bounceIn',
            animationHide: 'bounceOutLeft',
            position: {
                x: 'left', // left center right
                y: 'top' // top center bottom
            },
            duration: 2000
        };

        var storage = [];
        var options = {};
        util.extend(options, [defaultOptions, userOptions]);

        var localStorageKey = 'jnotice';
        var localStorage = null;
        if(options.saveLocalStorage) {
            localStorage = new LocalStorageManager();
            var localStorageData = localStorage.get(localStorageKey);
            if(localStorageData != null) {
                storage = localStorageData;
            }
        }

        var noticeContaineHTML = buildNoticeContainer();


        // *** Consts
        // Require synchronization width CSS class jnotice-animated -> JNotice-animate.less
        var ANIMATION_DURATION = 1000;
        var TIMEOUT_DELAY = 100;
        var NAMESPACE = 'jnotice';
        var NOW_CALLED = false;



        // *** API Methods

        /**
         *
         * @param notice
         * @returns {JNotice}
         */
        this.add = function(notice) {
            addStorage(notice);
            return this;
        };


        /**
         *
         * @returns {JNotice}
         */
        this.call = function() {
            checkedQueue();
            return this;
        };


        /**
         *
         * @returns {Array}
         */
        this.getStorage = function() {
            return storage.slice();
        };


        /**
         *
         * @returns {JNotice}
         */
        this.clearStorage = function() {
            storage = [];
            if(localStorage) {
                localStorage.remove(localStorageKey);
            }
            return this;
        };


        /**
         *
         * @returns {JNotice}
         */
        this.dismissAll = function() {
            removeAllNotice();
            return this;
        };


        /**
         *
         * @returns {JNotice}
         */
        this.destroy = function() {
            this.dismissAll();
            noticeContaineHTML.parentElement.removeChild(noticeContaineHTML);
            return this;
        };



        // *** Private methods

        /**
         *
         * @param notices
         */
        function addStorage(notices) {
            var noticesConstructor = util.getConstructor(notices);
            if(noticesConstructor === 'Object') {
                storage.push(notices);
                if(localStorage) {
                    synchronizeWidthLocalStorage();
                }
            }
            else if(noticesConstructor === 'Array') {
                notices.forEach(function(notice) {
                    if(util.getConstructor(notice) === 'Object') {
                        storage.push(notice);
                        if(localStorage) {
                            synchronizeWidthLocalStorage();
                        }
                    }
                });
            }
            else {
                throw new Error('Expected type: Object, instead got: ' + noticesConstructor);
            }
        }


        /**
         *
         */
        function checkedQueue() {
            if(storage.length > 0 && (options.methodShow !== 'queue' || !NOW_CALLED) ) {
                timeoutQueue(storage[0]);
            }
        }


        /**
         *
         * @param notice
         */
        function timeoutQueue(notice) {
            NOW_CALLED = true;
            var noticeHTML = buildNotice(notice);
            storage.splice(0, 1);

            if(localStorage) {
                synchronizeWidthLocalStorage();
            }

            var duration = notice.duration || options.duration;

            if(options.methodShow === 'queue') {
                setTimeout(function () {

                    setTimeout(function () {
                        removeSingleNotice(noticeHTML);
                        NOW_CALLED = false;
                        checkedQueue();
                    }, ANIMATION_DURATION);

                }, duration);
            }
            else {
                setTimeout(function() {
                    checkedQueue();
                }, TIMEOUT_DELAY);

                setTimeout(function() {
                    removeSingleNotice(noticeHTML);
                }, duration);
            }
        }



        /**
         *
         * @returns {Element}
         */
        function buildNoticeContainer() {
            var noticeContainerHTML = document.createElement('div');
            noticeContainerHTML.className += 'container-jnotice jnx-' + options.position.x + ' jny-' + options.position.y;
            document.body.appendChild(noticeContainerHTML);
            return noticeContainerHTML;
        }


        /**
         *
         * @param notice
         * @returns {Element}
         */
        function buildNotice(notice) {
            var noticeHTML = document.createElement('div');
            var noticeType = notice.type || 'message';
            noticeHTML.className += 'jnotice jnotice-' + noticeType;
            noticeHTML.innerHTML = notice.html;

            if(options.position.y === 'bottom') {
                noticeContaineHTML.appendChild(noticeHTML);
            }
            else {
                noticeContaineHTML.insertBefore(noticeHTML, noticeContaineHTML.firstChild);
            }

            if(options.position.x === 'center' || options.position.x === 'right') {
                setPositionNotice(noticeHTML, options.position.x);
            }

            setEventListeners(notice, noticeHTML);
            buildAnimation(noticeHTML);

            return noticeHTML;
        }


        /**
         *
         * @param noticeHTML
         */
        function buildAnimation(noticeHTML) {
            setTimeout(function() {
                noticeHTML.className += ' ' + NAMESPACE + '-visible';
                noticeHTML.className += ' ' + NAMESPACE + '-animated ' +  ' ' + NAMESPACE + '-' + options.animationShow;
            }, TIMEOUT_DELAY);
        }


        /**
         *
         * @param noticeHTML
         * @param position
         */
        function setPositionNotice(noticeHTML, position) {
            var coords = 0;
            if(position === 'center') {
                coords = (window.innerWidth / 2) - (noticeHTML.offsetWidth / 2);
                noticeHTML.style.left = coords + 'px';
            }
            else if(position === 'right') {
                coords =  noticeHTML.offsetWidth;
                noticeHTML.style.right = coords + 'px';
            }
        }


        /**
         *
         */
        function updatePositionNotice() {
            var notices = noticeContaineHTML.querySelectorAll('.jnotice');
            notices = Array.prototype.slice.call(notices);
            for (var i = 0; i < notices.length; i++) {
                setPositionNotice(notices[i], options.position.x);
            }
        }


        /**
         *
         * @type {Function}
         */
        var resize = util.debounce(function() {
            updatePositionNotice();
        }, 100);


        /**
         *
         * @param notice
         * @param noticeHTML
         */
        function setEventListeners(notice, noticeHTML) {
            noticeHTML.addEventListener('show', function(event) {
                if(notice.callbacks && notice.callbacks.show) {
                    notice.callbacks.show(event);
                }
            });

            noticeHTML.addEventListener('hide', function(event) {
                if(notice.callbacks && notice.callbacks.hide) {
                    notice.callbacks.hide(event);
                }
            });

            window.addEventListener('resize', resize);

            if(options.removeToClickAll) {
                noticeHTML.addEventListener('click', function () {
                    removeAllNotice();
                })
            }
            else if(options.removeToClick) {
                noticeHTML.addEventListener('click', function () {
                    removeSingleNotice(this, true);
                })
            }

            var event = document.createEvent('Event');
            event.initEvent('show', true, true);
            noticeHTML.dispatchEvent(event);
        }


        /**
         *
         * @param noticeHTML
         * @param hideIsUser
         * @returns {boolean}
         */
        function removeSingleNotice(noticeHTML, hideIsUser) {

            removeAnimation(noticeHTML);
            if(util.hasClass(noticeHTML, 'queue-removal')) {
                return false;
            }
            noticeHTML.className += ' queue-removal ';
            setTimeout(function() {

                var event = document.createEvent('event');
                event.initEvent('hide', true, true);
                event.hideIsUser = hideIsUser ? true : false;
                noticeHTML.dispatchEvent(event);

                noticeHTML.parentElement.removeChild(noticeHTML);
            }, ANIMATION_DURATION / 2);
        }


        /**
         *
         * @param noticeHTML
         */
        function removeAnimation(noticeHTML) {
            util.removeClass(noticeHTML, NAMESPACE + '-' + options.animationShow);
            noticeHTML.className += NAMESPACE + '-' + options.animationHide;
        }


        /**
         *
         */
        function removeAllNotice() {
            var notices = noticeContaineHTML.querySelectorAll('.jnotice');
            notices = Array.prototype.slice.call(notices);
            for (var i = 0; i < notices.length; i++) {
                removeSingleNotice(notices[i], true);
            }
        }



        /**
         *
         */
        function synchronizeWidthLocalStorage() {
            localStorage.set(localStorageKey, storage);
        }

    }


    /**
     *
     * @constructor
     */
    function LocalStorageManager() {

        /**
         *
         * @param key
         * @param object
         * @returns {LocalStorageManager}
         */
        this.set = function(key, object) {
            var objectLocal = object || {};
            var objectJSON = JSON.stringify(objectLocal);
            localStorage.setItem(key, objectJSON);
            return this;
        };


        /**
         *
         * @param key
         * @returns {null}
         */
        this.get = function(key) {
            var objectJSON = localStorage.getItem(key);
            return objectJSON == null ? null : JSON.parse(objectJSON);
        };


        /**
         *
         * @param key
         * @returns {LocalStorageManager}
         */
        this.remove = function(key) {
            localStorage.removeItem(key);
            return this;
        };

    }


    /**
     *
     * @constructor
     */
    function Utils() {
        var self = this;


        /**
         *
         * @param target
         * @param objects
         * @param options
         * @returns {*}
         */
        this.extend = function(target, objects, options) {
            for(var object in objects) {
                if(objects.hasOwnProperty(object)) {
                    recursiveMerge(target, objects[object]);
                }
            }

            function recursiveMerge(target, object) {
                for(var property in object) {
                    if(object.hasOwnProperty(property)) {
                        var current = object[property];
                        if(self.getConstructor(current) === 'Object') {
                            if(!target[property]) {
                                target[property] = {};
                            }
                            recursiveMerge(target[property], current);
                        }
                        else {
                            /** @namespace options.clearEmpty */
                            if(options && options.clearEmpty) {
                                if(current == null) {
                                    continue;
                                }
                            }
                            target[property] = current;
                        }
                    }
                }
            }
            return target;
        };


        /**
         *
         * @param object
         * @returns {string}
         */
        this.getConstructor = function(object) {
            return Object.prototype.toString.call(object).slice(8, -1);
        };


        /**
         *
         * @param func
         * @param ms
         * @returns {Function}
         */
        this.debounce = function(func, ms) {
            var savedContext;
            var savedArguments;
            var freeze = false;

            return function() {
                if(freeze) {
                    savedContext = this;
                    savedArguments = arguments;
                    return;
                }

                func.apply(this, arguments);
                freeze = true;

                setTimeout(function() {
                    freeze = false;
                    if(savedContext) {
                        func.apply(savedContext, savedArguments);
                        savedContext = savedArguments = null;
                    }
                }, ms);
            };
        };


        /**
         *
         * @param element
         * @param rmClass
         */
        this.removeClass = function(element, rmClass) {
            var classes = element.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] === rmClass) {
                    classes.splice(i, 1);
                    i--;
                }
            }
            element.className = classes.join(' ');
        };


        /**
         *
         * @param element
         * @param hClass
         * @returns {boolean}
         */
        this.hasClass = function(element, hClass) {
            var classes = element.className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] === hClass) {
                    return true;
                }
            }
        }

    }


    // Import name global scope
    window.JNotice = JNotice;


})();

