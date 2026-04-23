import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { notificationService } from "@/services/notificationService";
import { useAuth } from "@/contexts/AuthContext";

export type NotificationType = "team_invite" | "submission_update" | "announcement" | "connection" | "reminder";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const mapType = (backendType: string): NotificationType => {
    const normalized = backendType?.toLowerCase() || "";
    if (normalized.includes("invite")) return "team_invite";
    if (normalized.includes("submission") || normalized.includes("score")) return "submission_update";
    if (normalized.includes("announcement")) return "announcement";
    if (normalized.includes("connection")) return "connection";
    return "reminder";
  };

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated) {
        setNotifications([]);
        return;
      }
      try {
        const items = await notificationService.getAll();
        setNotifications(
          items.map((n) => ({
            id: String(n.id),
            type: mapType(n.type),
            title: n.type,
            message: n.message,
            timestamp: new Date(n.createdAt),
            read: n.read,
          }))
        );
      } catch {
        setNotifications([]);
      }
    };
    load();
  }, [isAuthenticated]);

  const markAsRead = useCallback((id: string) => {
    notificationService.markRead(id).catch(() => undefined);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllRead().catch(() => undefined);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);