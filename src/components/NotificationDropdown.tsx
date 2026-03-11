import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Check, CheckCheck, X, Users, Trophy, Megaphone, Link2, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications, type NotificationType } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  team_invite: { icon: <Users className="h-4 w-4" />, color: "text-primary bg-primary/10" },
  submission_update: { icon: <Trophy className="h-4 w-4" />, color: "text-secondary bg-secondary/10" },
  announcement: { icon: <Megaphone className="h-4 w-4" />, color: "text-accent bg-accent/10" },
  connection: { icon: <Link2 className="h-4 w-4" />, color: "text-[hsl(var(--evnova-orange))] bg-[hsl(var(--evnova-orange))]/10" },
  reminder: { icon: <Clock className="h-4 w-4" />, color: "text-destructive bg-destructive/10" },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotifications();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = (id: string, url?: string) => {
    markAsRead(id);
    if (url) {
      setOpen(false);
      navigate(url);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="end" sideOffset={8}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <h3 className="font-heading text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto gap-1 px-2 py-1 text-xs text-muted-foreground" onClick={markAllAsRead}>
              <CheckCheck className="h-3 w-3" /> Mark all read
            </Button>
          )}
        </div>

        {/* List */}
        <ScrollArea className="max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet</div>
          ) : (
            <div className="divide-y divide-border/30">
              {notifications.map((n) => {
                const cfg = typeConfig[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "group flex gap-3 px-4 py-3 transition-colors cursor-pointer hover:bg-muted/50",
                      !n.read && "bg-primary/5"
                    )}
                    onClick={() => handleClick(n.id, n.actionUrl)}
                  >
                    {/* Icon */}
                    <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", cfg.color)}>
                      {cfg.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-sm leading-snug", !n.read && "font-medium")}>{n.message}</p>
                        <button
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                          onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                          aria-label="Dismiss"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{timeAgo(n.timestamp)}</span>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;