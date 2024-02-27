var dropdowns = [];

function Dropdown(x, y, label, options) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.options = options;
    this.expanded = false;
}

Dropdown.prototype.draw = function() {
    // Draw dropdown label
    ModAPI.drawStringWithShadow({msg: this.label, x: this.x, y: this.y, color: -1});
    if (this.expanded) {
        // Draw expanded options
        for (var i = 0; i < this.options.length; i++) {
            ModAPI.drawStringWithShadow({msg: this.options[i], x: this.x, y: this.y + 10 * (i + 1), color: -1});
        }
    }
};

Dropdown.prototype.handleClick = function(mx, my) {
    if (mx >= this.x && mx <= this.x + 100 && my >= this.y && my <= this.y + 10) {
        this.expanded = !this.expanded;
    } else if (this.expanded) {
        for (var i = 0; i < this.options.length; i++) {
            if (mx >= this.x && mx <= this.x + 100 && my >= this.y + 10 * (i + 1) && my <= this.y + 10 * (i + 2)) {
                // Handle option click
                // Example: executeOption(this.options[i]);
                this.expanded = false;
                break;
            }
        }
    }
};

function executeOption(option) {
    // Execute selected option action
    // Example: changeSettings(option);
}

// Create dropdowns
dropdowns.push(new Dropdown(50, 100, "Dropdown 1", ["Option 1", "Option 2", "Option 3"]));
dropdowns.push(new Dropdown(50, 120, "Dropdown 2", ["Option A", "Option B", "Option C"]));

var customMenuOpen = false;

function CustomGuiMenu() {
    this.drawScreen = function() {
        // Draw custom menu UI here
        ModAPI.drawRect(50, 50, 200, 200, 0x80000000); // Transparent background
        // Draw dropdowns
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].draw();
        }
    };

    this.handleInput = function(mx, my, action) {
        // Handle input events here
        if (action === "click") {
            for (var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].handleClick(mx, my);
            }
        }
    };

    this.onClose = function() {
        customMenuOpen = false;
    };
}
