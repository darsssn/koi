const textarea = document.getElementById("inputText");

const MIN_SIZE = 14;
const MAX_SIZE = 20;

// Load saved font size or use default
let savedSize = localStorage.getItem("koi_textareaFontSize");
let currentSize = savedSize ? parseInt(savedSize) : 16;

textarea.style.fontSize = currentSize + "px";

function increaseFont() {
    if (currentSize < MAX_SIZE) {
        currentSize += 2;
        textarea.style.fontSize = currentSize + "px";
        localStorage.setItem("koi_textareaFontSize", currentSize);
        showToast("Font size increased to " + currentSize + "px");
    } else {
        showToast("Maximum font size reached: " + MAX_SIZE + "px");
    }
}

function decreaseFont() {
    if (currentSize > MIN_SIZE) {
        currentSize -= 2;
        textarea.style.fontSize = currentSize + "px";
        localStorage.setItem("koi_textareaFontSize", currentSize);
        showToast("Font size decreased to " + currentSize + "px");
    } else {
        showToast("Minimum font size reached: " + MIN_SIZE + "px");
    }
}