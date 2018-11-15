// SYNTHPLAYER CLASS

var SynthPlayer = function(options) {
    this.clock = options.clock;
    this.synthesizer = new Synthesizer({
        clock: this.clock,
        staticConfig: options.staticConfig,
        dynamicConfig: options.dynamicConfig || {},
    });
    this.pattern = options.pattern;
    this.octave = options.octave;
    this.clock.add(this.play.bind(this));
};

SynthPlayer.prototype.play = function(now, beat, bar) {
    bar = bar % this.pattern.length;
    pattern = this.pattern[bar];
    if(beat >= pattern.length) { return; }
    if(
        (beat === 0 || pattern[beat] !== pattern[beat - 1]) &&
        pattern[beat] !== ' '
    ) {
        var freq = this.getFrequency(pattern[beat]);
        var duration = this.getDuration(pattern, beat);
        this.synthesizer.play(now, freq, duration);
    }
};

SynthPlayer.prototype.getFrequency = function(note) {
    if(note === 'a') { note = 10; }
    if(note === 'b') { note = 11; }
    note = parseInt(note, 10);
    note = this.octave * 12 + note;
    // Converts a MIDI note number to a frequency value
    return (440 / 32) * Math.pow(2, (note - 9) / 12);
};

SynthPlayer.prototype.getDuration = function(pattern, beat) {
    var note = pattern[beat];
    var length = 1;
    for(var i = beat + 1; i < pattern.length; i++) {
        if(pattern[i] === note) { length++; }
        else { break; }
    }
    return length * 60 / this.clock.tempo;
};
