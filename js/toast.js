// Function to display a toast message
function showToast(message) {
    // Dynamically set the message for the toast
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;  // Set the message dynamically

    // Display Toast notification using Bootstrap Toast
    const toastEl = new bootstrap.Toast(document.getElementById('toastCopy'));
    toastEl.show();  // Show the toast
}

// Function to inject the Toast HTML into the document
function injectToastHTML() {
    const toastHTML = `
    <!-- Toast Notification -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toastCopy" class="toast border border-dark" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-light text-dark">
                <i class="bi bi-circle-fill me-2"></i>
                <strong class="me-auto">KOI</strong> <small>just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body bg-light text-dark" id="toastMessage">...</div>
        </div>
    </div>
    <!-- Toast Notification -->`;

    // Inject the HTML into the body
    document.body.insertAdjacentHTML('beforeend', toastHTML);
}

// Call function to add the toast HTML to the page
injectToastHTML();
