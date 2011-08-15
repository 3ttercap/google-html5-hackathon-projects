(function() {
    var ns = namespace('piano.keyboard');

    ns.Keyboard = function(options) {
        this.el = document.createElement('ul');
        this.el.classList.add('piano-keyboard');
        this.keys = options.keys;
        this.keyList = {};
        this.recored = false;
        this.recordTime = 0;
        this.recordList = [];

        _.bindAll(this);
    };

    ns.Keyboard.prototype = {
        render: function() {
            this.keys.forEach(this.addKey);

            this.bindEvent();
        },

        addKey: function(key) {
            key.render();
            this.el.appendChild(key.el);
            this.keyList[key.name] = key;
        },

        bindEvent: function() {
            document.addEventListener('keydown', this.onKey);
        },

        onKey: function(evt) {
            var key = evt.which;

            if (key >= 65 && key < 91) {
                key = String.fromCharCode(key);

                if (evt.ctrlKey) {
                    switch (key) {
                        case 'R':
                        this.recordInput();
                        evt.preventDefault();
                        break;

                        case 'S':
                        this.stopRecord();
                        evt.preventDefault();
                        break;

                        case 'P':
                        this.replay();
                        evt.preventDefault();
                        break;
                    }
                } else {
                    if (this.keyList[key]) {
                        this.keyList[key].click();
                    }

                    if (this.recored) {
                        var record = {
                            time: new Date() - 0 - this.recordTime,
                            input: key
                        };
                        this.recordList.push(record);
                        this.recordTime = new Date() - 0;
                    }
                }
            }
        },

        play: function(key) {
            if (this.keyList[key]) {
                this.keyList[key].click();
            }
        },

        recordInput: function() {
            alert('recording...');
            this.recored = true;
            this.recordList = [];
            this.recordTime = new Date() - 0;
        },

        replay: function() {
            if (this.recordList.length > 0) {
                var record = this.recordList.shift();
                this.play(record.input);
                if (this.recordList.length > 0) {
                    setTimeout(this.replay, this.recordList[0].time);
                }
            }
        },

        stopRecord: function() {
            alert('stop record');
            this.recordTime = 0;
            this.record = false;
            this.saveInput();
        },

        saveInput: function() {
            localStorage.setItem('record', JSON.stringify(this.recordList));
        },

        loadInput: function() {
            this.recordList = JSON.parse(localStorage.getItem('record')) || [];
        }
    };
})();
