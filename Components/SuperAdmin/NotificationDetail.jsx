import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../appUrl";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const token = localStorage.getItem("user");
        const res = await axios.get(`${apiurl}notify/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotification(res.data);
      } catch (err) {
        console.error("Failed to fetch notification:", err);
      }
    };

    fetchNotification();
  }, [id]);

  if (!notification) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Notification Detail</h1>
      <p><strong>ID:</strong> {notification._id}</p>
      <p><strong>Message:</strong> {notification.message}</p>
    </div>
  );
};

export default NotificationDetail;
