let notifications = {}; // Each notification has a key → message

function showNotification(message, key = null) {
    if (key) {
        notifications[key] = message; // Replace or create
    } else {
        // Auto-generate a unique key
        key = "n" + Date.now();
        notifications[key] = message;
    }

    updateNotificationList();
}

function updateNotificationList() {
    const container = document.getElementById("notifList");
    container.innerHTML = ""; // reset

    const keys = Object.keys(notifications);

    // Update badge
    document.getElementById("notifBadge").innerText = keys.length;

    // Enable bell dropdown
    document.getElementById("notifBell").classList.toggle("disabled", keys.length === 0);

    keys.forEach(key => {
        const msg = notifications[key];

        container.innerHTML += `
            <a href="#" class="dropdown-item fs-7 d-flex justify-content-between"
               style="white-space: normal; word-wrap: break-word;">

                <span><i class="bi bi-exclamation-diamond-fill me-1"></i> ${msg}</span>

                <button class="btn btn-sm btn-link text-danger p-0"
                        onclick="removeNotification('${key}')">
                    &times;
                </button>
            </a>
        `;
    });
}

function removeNotification(key) {
    delete notifications[key];
    updateNotificationList();
}

function clearNotification() {
    notifications = {};
    updateNotificationList();
}
