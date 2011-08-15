(function() {
    var ns = namespace('piano');

    var keyPos = [
        'left white', 
        'black', 
        'right white',
        'black', 
        'right white',
        'left white', 
        'black', 
        'right white',
        'black', 
        'right white',
        'black', 
        'right white'
    ];

    var startPos = 5;

    var tunes = [
    { "-4#" : "61" },
    { "E" : "65" },
    { "-5#" : "67" },
    { "F" : "69" },
    { "-6#" : "71" },
    { "G" : "75" },
    { "H" : "77" },
    { "1#" : "79" },
    { "I" : "81" },
    { "2#" : "83" },
    { "J" : "85" },
    { "K" : "87" },
    { "4#" : "89" },
    { "L" : "91" },
    { "5#" : "93" },
    { "M" : "95" },
    { "6#" : "97" },
    { "N" : "99" },
    { "O" : "101" },
    { "=1#" : "103" },
    { "P" : "105" },
    { "=2#" : "107" },
    { "Q" : "109" },
    { "R" : "111" },
    { "=4#" : "113" },
    { "S" : "115" },
    { "=5#" : "117" },
    { "T" : "119" },
    { "=6#" : "121" },
    { "U" : "123" },
    { "V" : "127" }];

    var keyList = _.map(tunes, function(tunePair) {
        var key = _.keys(tunePair)[0];
        var tune = tunePair[key];

        startPos = (startPos + 1) % 12;

        return {
            name: key,
            position: key === '-7' ? 'white left' : keyPos[startPos],
            tune: tune
        };
    }).map(function(keyInfo) {
        var tune = new ns.tune.Tune({
            name: keyInfo.tune
        });

        var key = new ns.key.Key({
            name: keyInfo.name,
            position: keyInfo.position,
            tune: tune
        });

        return key;
    });

    var keyboard = new ns.keyboard.Keyboard({
        keys: keyList
    });

    keyboard.render();

    document.body.appendChild(keyboard.el);

    keyboard.loadInput();
})();
