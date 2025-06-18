import { ref } from "vue";

const notificationShow = ref(false);
const notificationMessage = ref("");
const notificationDescription = ref("");
const notificationType = ref("default");
const notificationColor = ref("");
const progress = ref(100);

let timer = null;
let progressTimer = null;

function showNotification(type, color, message, description = "", duration = 3000) {
  notificationShow.value = true;
  notificationMessage.value = message;
  notificationDescription.value = description;
  notificationType.value = type;
  notificationColor.value = color;
  progress.value = 100;

  clearTimeout(timer);
  clearInterval(progressTimer);

  const interval = 100;
  const step = (100 / duration) * interval;

  progressTimer = setInterval(() => {
    if (progress.value > 0) {
      progress.value -= step;
    } else {
      clearInterval(progressTimer);
    }
  }, interval);

  timer = setTimeout(clearNotification, duration);
}

function clearNotification() {
  notificationShow.value = false;
  notificationMessage.value = "";
  notificationDescription.value = "";
  notificationType.value = "default";
  notificationColor.value = "";
  progress.value = 100;

  clearTimeout(timer);
  clearInterval(progressTimer);
}

function notificationSuccess(message, description = "", duration = 5000) {
  showNotification("success", "green", message, description, duration);
}

function notificationError(message, description = "", duration = 5000) {
  showNotification("error", "red", message, description, duration);
}

function notificationWarning(message, description = "", duration = 5000) {
  showNotification("warning", "yellow", message, description, duration);
}

function notificationInfo(message, description = "", duration = 5000) {
  showNotification("info", "blue", message, description, duration);
}

function showMultipleErrors(errors, type = "error", color = "red", duration = 5000) {
  errors.forEach((error, index) => {
    setTimeout(() => {
      showNotification(type, color, error, "", duration);
    }, index * (duration + 500));
  });
}

export function useNotification() {
  return {
    notificationShow,
    notificationMessage,
    notificationDescription,
    notificationType,
    notificationColor,
    progress,
    showNotification,
    clearNotification,
    notificationSuccess,
    notificationError,
    notificationWarning,
    notificationInfo,
    showMultipleErrors
  };
}
