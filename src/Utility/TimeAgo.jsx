// Utility for "time ago"
const timeAgo = (timestamp) => {
  const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};