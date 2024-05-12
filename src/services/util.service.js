export const utilService = {
  saveToStorage,
  loadFromStorage,
  formatTimestamp,
  capitalizeFirstLetter,
  dateStringToTimestamp,
  timestampToDateString
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return (data) ? JSON.parse(data) : undefined
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTimestamp(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const isSameDay = now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (isSameDay) {
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return diffMins + ' minutes ago';
    } else {
      const hoursAgo = Math.floor(diffMs / (1000 * 60 * 60));
      return hoursAgo + ' hours ago';
    }
  } else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

function dateStringToTimestamp(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const dateObject = new Date(year, month - 1, day); // month - 1 because months are zero-based in JavaScript
  return dateObject.getTime();
}

function timestampToDateString(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear().toString();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are zero-based
  const day = dateObject.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}