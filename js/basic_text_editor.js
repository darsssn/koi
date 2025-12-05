function replaceText() {
  const inputData = document.getElementById("inputText");
  const findText = document.getElementById('modalInputData-findText').value;
  const replaceWith = document.getElementById('modalInputData-replaceWith').value;

  //const find = prompt("Enter the text to find:");
  if (findText === null) return; // Cancel pressed
  //const replace = prompt(`Replace "${find}" with:`);
  if (replaceWith === null) return;
  
  const regex = new RegExp(findText, 'g');
  inputData.value = inputData.value.replace(regex, replaceWith);

  // Close and clear modal inputs
  const modal = bootstrap.Modal.getInstance(document.getElementById('modal-replaceText'));
  modal.hide();
  document.getElementById('modalInputData-findText').value = "";
  document.getElementById('modalInputData-replaceWith').value = "";

  inputData.dispatchEvent(new Event('input')); // Trigger input event so persistence works
}

function trimSpaces() {
  const inputData = document.getElementById("inputText");
  inputData.value = inputData.value.split('\n').map(line => line.trim()).join('\n');
  inputData.dispatchEvent(new Event('input')); // Trigger input event so persistence works
}

function toMultiline() {
  const inputData = document.getElementById("inputText");
  const delimiters = document.getElementById('modalInputData-toMultiLines').value.trim();
  if (delimiters === null || delimiters.trim() === "") return;

  // Create a regex from the entered delimiters
  const regex = new RegExp(`[${delimiters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`, 'g');
  inputData.value = inputData.value.split(regex).map(item => item.trim()).join('\n');
  
  // Close and clear modal inputs
  const modal = bootstrap.Modal.getInstance(document.getElementById('modal-toMultiLines'));
  modal.hide();
  document.getElementById('modalInputData-toMultiLines').value = "";

  inputData.dispatchEvent(new Event('input')); // Trigger input event so persistence works
}

function toSingleLine() {
  const inputData = document.getElementById("inputText");
  const separator = document.getElementById('modalInputData-toSingleLine').value;
  if (separator === null) return;

  const joined = inputData.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join(separator);
  inputData.value = joined;

  // Close and clear modal inputs
  const modal = bootstrap.Modal.getInstance(document.getElementById('modal-toSingleLine'));
  modal.hide();
  document.getElementById('modalInputData-toSingleLine').value = "";

  inputData.dispatchEvent(new Event('input')); // Trigger input event so persistence works
}

function removeDuplicateLines() {
  const inputData = document.getElementById("inputText");
  const lines = inputData.value.split('\n');
  const seen = new Set();
  const unique = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (!seen.has(trimmed) && trimmed !== '') {
      seen.add(trimmed);
      unique.push(line); // preserves original line formatting
    }
  }

  inputData.value = unique.join('\n');
  inputData.dispatchEvent(new Event('input')); // Trigger input event so persistence works
}