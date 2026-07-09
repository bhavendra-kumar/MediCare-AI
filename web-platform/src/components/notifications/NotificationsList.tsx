"use client";

import React from "react";
import { Bell, Activity, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH3, TypographyP, TypographySmall } from "@/components/ui/typography";


const mockNotifications = [
  { id: 1, title: "Report Analysis Complete", desc: "Your comprehensive blood panel results are ready to view.", time: "2 hours ago", icon: FileText, unread: true },
  { id: 2, title: "Upcoming Appointment", desc: "Reminder: Video consultation with Dr. Jenkins tomorrow at 10:00 AM.", time: "4 hours ago", icon: Bell, unread: true },
  { id: 3, title: "New Message", desc: "AI Assistant has updated your health summary.", time: "1 day ago", icon: Activity, unread: false },
  { id: 4, title: "Profile Update Required", desc: "Please update your emergency contact information.", time: "2 days ago", icon: User, unread: false },
];

export function NotificationsList() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <TypographyH1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</TypographyH1>
          <TypographyP className="text-slate-500 mt-1 dark:text-slate-400">Stay updated on your health activities and appointments.</TypographyP>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {mockNotifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50 ${notif.unread ? "bg-sky-50/30 dark:bg-sky-900/10" : ""}`}
            >
              <div className="flex gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    notif.unread
                      ? "bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <notif.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <TypographyH3 className={`text-sm font-medium ${notif.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                      {notif.title}
                    </TypographyH3>
                    <TypographySmall className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-4">{notif.time}</TypographySmall>
                  </div>
                  <TypographyP className="text-sm text-slate-600 dark:text-slate-400">{notif.desc}</TypographyP>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
