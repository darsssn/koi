function logNumbers() {
    const keyword = document.getElementById('modalInputData-logNumbers').value.trim();
    
    if (keyword.length === 0) {
        return;
    }

    // Get input and remove empty lines
    const inputData = document.getElementById("inputText").value;
    const lines = inputData
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line !== "");  // Remove empty lines

    if (lines.length === 0) {
        return;
    }

    let groups = [];
    let currentGroup = [];

    for (let line of lines) {
        if (line.startsWith(keyword)) {
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
            }
        }
        currentGroup.push(line);
    }

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    let output = "";
    for (let i = 0; i < groups.length; i++) {
        output += `[${i + 1}]\n` + groups[i].join("\n") + "\n\n";
    }

    // Close and clear modal inputs
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-logNumbers'));
    modal.hide();
    document.getElementById('modalInputData-logNumbers').value = "";

    // Open output modal
    const outputModal = new bootstrap.Modal(document.getElementById('modal-outputText'));
    outputModal.show();
    
    document.getElementById("modalData-outputText").value = output;
    saveOutputTextToCache();

    //localStorage.setItem('koi_textEditor_outputText', output); // Save output to localStorage
    //console.log(localStorage.getItem('koi_textEditor_outputText'));
}

function extractFirstKeyword() {
    // Get the value from the input textarea
    const input = document.getElementById('inputText').value;
    
    // Use regex to find the first keyword including the colon
    const regex = /^([^:]+:)/;
    const match = input.split('\n')[0].match(regex);
    
    if (match) {
        // If a match is found, set the value of outputText to that keyword with the colon
        document.getElementById('modalInputData-logNumbers').value = match[0];
    } else {
        // If no match, show a message
        // toast notifs here...
    }
}

function inputFieldnames() {
    // Data Input
    let dataLines = document.getElementById("inputText").value
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l !== "");  // Remove empty lines

    if (dataLines.length === 0) {
        return;
    }

    // Field Names / Headers Input
    let headers = document.getElementById("modalInputData-inputFieldnames").value
        .split(",")
        .map(h => h.trim())
        .filter(h => h !== "");

    if (headers.length === 0) {
        return;
    }

    // VALIDATION: data must be divisible by number of headers
    if (dataLines.length % headers.length !== 0) {
        // js/toast.js
        showToast("ERROR: The number of input data lines (" + dataLines.length + 
            ") is NOT divisible by the number of field names (" + headers.length + ").");
        return;
    }

    let output = "";
    let headerIndex = 0;

    for (let i = 0; i < dataLines.length; i++) {
        output += `${headers[headerIndex]}: ${dataLines[i]}\n`;

        headerIndex++;
        if (headerIndex >= headers.length) {
            headerIndex = 0; // Restart headers
        }
    }

    document.getElementById("modalData-outputText").value = output;
    document.getElementById("modalInputData-previousFieldnames").value = headers.join(", ");
    saveOutputTextToCache();

    // Close and clear modal inputs
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-inputFieldnames'));
    modal.hide();
    document.getElementById('modalInputData-inputFieldnames').value = "";

    // Open output modal
    const outputModal = new bootstrap.Modal(document.getElementById('modal-outputText'));
    outputModal.show();
}

// Output Modal Copy Button functionality
function copyModalOutputText() {
    const outputTextbox = document.getElementById('modalData-outputText');
    outputTextbox.select();  // Select the contents of the textarea
    document.execCommand('copy');  // Execute the copy command to copy the selected text
    // js/toast.js
    showToast("Text copied to clipboard!");
    outputTextbox.blur();  // This will unselect the text by removing focus from the textarea
}

// Function to save output text to local storage
function saveOutputTextToCache() {
    const outputText = document.getElementById('modalData-outputText').value;
    const previousFieldnames = document.getElementById('modalInputData-previousFieldnames').value;
    if (outputText) {
        localStorage.setItem('koi_textEditor_outputText', outputText);
        console.log('Output text saved to localStorage.');
    } else {
        console.log('No output text to save.');
    }
    if (previousFieldnames) {
        localStorage.setItem('koi_textEditor_previousFieldnames', previousFieldnames);
        console.log('Previous fieldnames saved to localStorage.');
    } else {
        console.log('No previous fieldnames to save.');
    }
}

function loadOutputTextFromCache() {
    const savedOutputText = localStorage.getItem('koi_textEditor_outputText');
    const savedPreviousFieldnames = localStorage.getItem('koi_textEditor_previousFieldnames');
    
    if (savedPreviousFieldnames !== null) {
        document.getElementById('modalInputData-previousFieldnames').value = savedPreviousFieldnames;
    }
    if (savedOutputText !== null) {
        document.getElementById('modalData-outputText').value = savedOutputText;
    }
}