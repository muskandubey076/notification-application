const form = document.getElementById("notificationForm");
const titleInput = document.getElementById("notificationTitle");
const messageInput = document.getElementById("notificationMessage");
const typeInput = document.getElementById("notificationType");
const list = document.getElementById("notificationList");
const countText = document.getElementById("notificationCount");
const clearAllButton = document.getElementById("clearAllButton");
const toast = document.getElementById("toast");

let notifications = [];
let toastTimer;

const typeDetails = {
  info: { icon: "ℹ️", className: "info" },
  success: { icon: "✅", className: "success" },
  warning: { icon: "⚠️", className: "warning" },
  error: { icon: "🚨", className: "error" }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function renderNotifications() {
  list.replaceChildren();
  countText.textContent = `${notifications.length} notification${notifications.length === 1 ? "" : "s"}`;

  if (notifications.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = '<span class="empty-icon">📭</span><h3>No notifications yet</h3><p>Create your first notification using the form above.</p>';
    list.appendChild(empty);
    return;
  }

  notifications.forEach((notification) => {
    const details = typeDetails[notification.type];
    const item = document.createElement("article");
    item.className = `notification ${details.className}`;

    const icon = document.createElement("div");
    icon.className = "notification-icon";
    icon.textContent = details.icon;
    icon.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "notification-content";

    const title = document.createElement("h3");
    title.textContent = notification.title;

    const message = document.createElement("p");
    message.textContent = notification.message;

    const time = document.createElement("span");
    time.className = "notification-time";
    time.textContent = notification.createdAt;

    content.append(title, message, time);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Dismiss";
    deleteButton.setAttribute("aria-label", `Dismiss ${notification.title}`);
    deleteButton.addEventListener("click", () => {
      notifications = notifications.filter((entry) => entry.id !== notification.id);
      renderNotifications();
      showToast("Notification dismissed.");
    });

    item.append(icon, content, deleteButton);
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const message = messageInput.value.trim();
  const type = typeInput.value;

  if (!title || !message) {
    showToast("Please enter both a title and a message.");
    return;
  }

  notifications.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    message,
    type,
    createdAt: new Date().toLocaleString()
  });

  renderNotifications();
  form.reset();
  titleInput.focus();
  showToast("Notification created successfully!");
});

clearAllButton.addEventListener("click", () => {
  if (notifications.length === 0) {
    showToast("There are no notifications to clear.");
    return;
  }
  notifications = [];
  renderNotifications();
  showToast("All notifications cleared.");
});

renderNotifications();
