// CLOCK CLASS

// Create a central clock so that different modules
// will all use the same timing.
// Takes `tempo` and `numBeats`
var Clock = function(options) {
    this.tempo = options.tempo;
    this.numBeats = options.numBeats;
    this.handlers = [];
    this.beat = -1;
    this.bar = 0;
    this.start = context.currentTime;
    this._tick = this.tick.bind(this);
    this._tick();
};

// Add a method to be called on each clock tick.
Clock.prototype.add = function(fn) {
    this.handlers.push(fn);
};

// Iterate on this function as quickly as JavaScript can process.
// Determines when a new beat needs to be played.
Clock.prototype.tick = function() {
    var now = context.currentTime;
    var time = now - this.start;
    var currentBeat = Math.floor(time * this.tempo / 60);

    if(currentBeat >= this.numBeats) {
        this.start = now;
        this.beat = 0;
        this.bar++;
        this.trigger(now);
    }
    else if(this.beat < currentBeat) {
        this.beat = currentBeat;
        this.trigger(now);
    }

    setTimeout(this._tick, 0);
};

// Call the handlers with the current beat and bar
Clock.prototype.trigger = function(now) {
    var clock = this;
    this.handlers.forEach(function(fn) { fn(now, clock.beat, clock.bar); });
};
