
// SynthBank Class
// A collection of synthesizers and SynthPlayers

var SynthBank = function(options) {
    this.clock = options.clock;
    this.instruments = options.instruments;
    this.initialize();
};

SynthBank.prototype.initialize = function() {
    this.synths = [];
    this.instruments.forEach(function(instrument) {
        this.synths.push(new SynthPlayer({
            clock: this.clock,
            octave: instrument.octave,
            pattern: instrument.pattern,
            staticConfig: instrument.staticConfig,
            dynamicConfig: instrument.dynamicConfig,
        }));
    }.bind(this));
};
