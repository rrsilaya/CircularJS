function Text(ctx, cx, cy, txt, font, radius) {

    this.radius = radius;               // expose so we can alter it live

    ctx.textBaseline = 'bottom';        // use base of char for rotation
    ctx.textAlign = 'center';           // center char around pivot
    ctx.font = font;

    var charsSplit = txt.split(''),     // split string to chars
        chars = [],                     // holds Char objects (see below)
        scale = 0.01,                   // scales the space between the chars
        step = 0.05,                    // speed in steps
        i = 0, ch;

    for(; ch = charsSplit[i++];)       // create Char objects for each char
        chars.push(new Char(ctx, ch));

    // render the chars
    this.render = function() {

        var i = 0, ch, w = 0;

        ctx.translate(cx, cy);         // rotate the canvas creates the movement
        ctx.rotate(-step);
        ctx.translate(-cx, -cy);

        for(; ch = chars[i++];) {      // calc each char's position
            ch.x = cx + this.radius * Math.cos(w);
            ch.y = cy + this.radius * Math.sin(w);

            ctx.save();                // locally rotate the char
            ctx.translate(ch.x, ch.y);
            ctx.rotate(w + 0.5 * Math.PI);
            ctx.translate(-ch.x, -ch.y);
            ctx.fillText(ch.char, ch.x, ch.y);
            ctx.restore();

            w += ch.width * scale;
        }
    };
}

function Char(ctx, ch) {
    this.char = ch;                    // current char
    this.width = ctx.measureText('W').width;  // width of char or widest char
    this.x = 0;                        // logistics
    this.y = 0;
}