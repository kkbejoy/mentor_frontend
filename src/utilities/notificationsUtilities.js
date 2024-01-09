export const unReadNotifications = (notifications) => {
  try {
    console.log("Nti", notifications);
    for (let i = 0; i < notifications.notifications.length; i++) {
      if (!notifications.notifications[i].isRead) {
        return true;
      }
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
