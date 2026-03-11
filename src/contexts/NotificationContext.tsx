import React, { createContext, useContext, useState, useCallback } from "react";

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

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "team_invite",
    title: "Team Invite",
    message: "Jayesh invited you to join Team Quantum for AI Innovation Challenge",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    actionUrl: "/participant/dashboard",
    avatar: "S",
  },
  {
    id: "2",
    type: "submission_update",
    title: "Submission Scored",
    message: "Your project \"EcoTrack\" received a score of 34/40 in Green Tech Hackathon",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: "/participant/dashboard",
    avatar: "🏆",
  },
  {
    id: "3",
    type: "announcement",
    title: "New Hackathon",
    message: "Blockchain for Good 2025 is now open for registration. $15K in prizes!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: "/hackathons",
    avatar: "🚀",
  },
  {
    id: "4",
    type: "connection",
    title: "Connection Request",
    message: "Sarvesh wants to connect with you for upcoming hackathons",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    actionUrl: "/community",
    avatar: "P",
  },
  {
    id: "5",
    type: "reminder",
    title: "Deadline Approaching",
    message: "AI Innovation Challenge submission deadline is in 48 hours",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    read: true,
    actionUrl: "/hackathons",
    avatar: "⏰",
  },
  {
    id: "6",
    type: "team_invite",
    title: "Team Invite",
    message: "Vivek wants you to join Team NeuralNet for the ML Sprint",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    avatar: "A",
  },
  {
    id: "7",
    type: "submission_update",
    title: "Feedback Available",
    message: "The judges left feedback on your FinTech Disrupt submission",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    read: true,
    actionUrl: "/participant/dashboard",
    avatar: "💬",
  },
];

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
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