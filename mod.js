var dropdowns = [];
var selectedDropdown = null;
var selectedButton = null;

function Dropdown(x, y, label, buttons) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.buttons = buttons;
    this.expanded = false;
}

Dropdown.prototype.draw = function() {
    // Draw dropdown label
    ModAPI.drawRect(this.x, this.y, 100, 10, 0x40000000); // Gray background for label
    ModAPI.drawStringWithShadow({msg: this.label, x: this.x + 2, y: this.y + 2, color: -1});

    if (this.expanded) {
        // Draw expanded options
        for (var i = 0; i < this.buttons.length; i++) {
            var buttonColor = selectedButton === this.buttons[i] ? 0x8000FF00 : 0x80CCCCCC; // Green if selected, gray if not
            ModAPI.drawRect(this.x, this.y + 10 * (i + 1), 100, 10, buttonColor); // Button background
            ModAPI.drawStringWithShadow({msg: this.buttons[i], x: this.x + 2, y: this.y + 10 * (i + 1) + 2, color: -1});
        }
    }
};

Dropdown.prototype.handleClick = function(mx, my) {
    if (mx >= this.x && mx <= this.x + 100 && my >= this.y && my <= this.y + 10) {
        this.expanded = !this.expanded;
    } else if (this.expanded) {
        for (var i = 0; i < this.buttons.length; i++) {
            if (mx >= this.x && mx <= this.x + 100 && my >= this.y + 10 * (i + 1) && my <= this.y + 10 * (i + 2)) {
                selectedButton = this.buttons[i];
                break;
            }
        }
    }
};

function executeAction(action) {
    // Execute selected action
    // Example: changeSettings(action);
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
        selectedDropdown = null;
        selectedButton = null;
    };
}
