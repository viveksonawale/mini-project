import { api, unwrap } from "@/services/api";

export type NotificationItem = {
  id: number;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export const notificationService = {
  getAll() {
    return api.get("/api/notifications").then((r) => unwrap<NotificationItem[]>(r.data));
  },
  markRead(id: string | number) {
    return api.patch(`/api/notifications/${id}/read`);
  },
  markAllRead() {
    return api.patch("/api/notifications/read-all");
  },
};

