function namespace(name) {
    var ret = window;
    name.split('.').forEach(function(name) {
        ret[name] = ret[name] || {};
        ret = ret[name];
    });

    return ret;
}
