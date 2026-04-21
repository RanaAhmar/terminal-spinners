/**
 * Terminal Spinner for Node.js
 * Developed by Ahmar Hussain (Stackaura)
 * https://www.stackaura.com/
 */

const SPINNERS = {
    dots: {
        interval: 80,
        frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    },
    line: {
        interval: 130,
        frames: ["-", "\\", "|", "/"]
    },
    classic: {
        interval: 200,
        frames: ["[    ]", "[=   ]", "[==  ]", "[=== ]", "[ ===]", "[  ==]", "[   =]", "[    ]", "[   =]", "[  ==]", "[ ===]", "[====]", "[=== ]", "[==  ]", "[=   ]"]
    }
};

class Spinner {
    constructor(type = 'dots') {
        this.spinner = SPINNERS[type] || SPINNERS.dots;
        this.frameIndex = 0;
        this.timer = null;
    }

    start(message = '') {
        process.stdout.write('\u001B[?25l'); // Hide cursor
        this.timer = setInterval(() => {
            const frame = this.spinner.frames[this.frameIndex];
            process.stdout.write(`\r${frame} ${message}`);
            this.frameIndex = (this.frameIndex + 1) % this.spinner.frames.length;
        }, this.spinner.interval);
    }

    stop(finalMessage = '') {
        clearInterval(this.timer);
        process.stdout.write(`\r${finalMessage}\n`);
        process.stdout.write('\u001B[?25h'); // Show cursor
    }
}

module.exports = Spinner;
