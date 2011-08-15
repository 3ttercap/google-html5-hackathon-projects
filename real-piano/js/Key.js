(function() {
    var ns = namespace('piano.key');

    ns.Key = function(options) {
        this.name = options.name;
        this.position = options.position;
        this.tune = options.tune;

        this.el = document.createElement('li');
        this.el.classList.add('piano-key');

        _.bindAll(this);
    };

    ns.Key.prototype = {
        click: function() {
            this.tune.play();

            this.el.classList.add('on');

            var el = this.el;
            setTimeout(function() {
                el.classList.remove('on');
            }, 200);
        },

        render: function() {
            this.position.split(' ').forEach(_.bind(this.el.classList.add, this.el.classList));
            this.el.dataset.name = this.name;

            this.bindEvent();
        },

        prompt: function() {
        },

        bindEvent: function() {
            this.el.addEventListener('click', this.click);
        }
    };
})();
