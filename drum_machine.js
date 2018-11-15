// DRUM MACHINE CLASS

// Create a new drum machine instance
// Takes options `clock`, `basePath`, `instruments`, and `pattern`.
var DrumMachine = function(options) {
    this.drums = [];
    this.clock = options.clock;
    this.basePath = options.basePath;
    this.instruments = options.instruments;
    this.pattern = options.pattern;
    this.load();
};

// Creates new drum instances
// When all drum instances have loaded their samples,
// Then play the drum machine
DrumMachine.prototype.load = function() {
    this.readyCount = 0;
    this.totalCount = Object.keys(this.instruments).length;
    for(var name in this.instruments) {
        var path = this.instruments[name];
        var url = this.basePath + path;
        this.drums[name] = new Drum();
        this.drums[name].load(url, this.loaded.bind(this));
    }
};

// Count when a drum has loaded its sample
// When ready, start playing
DrumMachine.prototype.loaded = function() {
    this.readyCount++;
    if(this.readyCount === this.totalCount) {
        this.clock.add(this.play.bind(this));
    }
};

// Given the beat number, play any of the drums that need to be played.
DrumMachine.prototype.play = function(now, beat) {
    for(var name in this.pattern) {
        var pattern = this.pattern[name];
        if(beat < pattern.length && pattern[beat] === 'x') {
            this.drums[name].play();
        }
    }
};
