(function() {
    var ns = namespace('piano.tune');

    ns.Tune = function(options) {
        this.name = options.name;
        this.sound = './sound/' + this.name + '.mp3';

        this.player = new Audio(this.sound);
    };

    ns.Tune.prototype = {
        play: function() {
            if (this.player.currentTime !== 0) {
                this.player.currentTime = 0;
            }
            this.player.play();
        }
    };
})();
