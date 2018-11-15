// ADSR CLASS

var ADSR = function(options) {
    options = options || {};
    this.attack = options.attack || 0.02; // ...in seconds
    this.decay = options.decay || 0.02; // ...in seconds
    this.sustain = options.sustain || 0.5; // ...in amplitude
    this.release = options.release || 0.02; // ...in seconds
};

ADSR.prototype.connect = function(param) {
    this.params = this.params || [];
    this.params.push(param);
};

ADSR.prototype.disconnect = function() {
    this.params = null;
};

ADSR.prototype.play = function(now, duration) {
    this.params.forEach(function(param) {
        param.cancelScheduledValues(now);
        param.setValueAtTime(param.value || 0, now);
        param.linearRampToValueAtTime(1, now + this.attack);
        param.setValueAtTime(1, now + this.attack);
        param.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);
        param.setValueAtTime(this.sustain, now + duration - this.release);
        param.linearRampToValueAtTime(0, now + duration);
    }.bind(this));
    setTimeout(this.disconnect.bind(this), duration);
};
