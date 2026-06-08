import {
  NotificationSeverityEnum,
  NotificationTypeEnum,
} from "typescript/enums";
import type { NotificationItem } from "typescript/types";

export const notificationsSeed: NotificationItem[] = [
  {
    id: "n-1",
    title: "AI risk escalation",
    detail: "Aarav Mehta crossed the cardiac risk threshold.",
    type: NotificationTypeEnum.AI,
    severity: NotificationSeverityEnum.error,
    time: "2 min ago",
  },
  {
    id: "n-2",
    title: "Inventory reorder",
    detail: "Albuterol Inhaler is projected to stock out in 19 hours.",
    type: NotificationTypeEnum.Inventory,
    severity: NotificationSeverityEnum.warning,
    time: "8 min ago",
  },
  {
    id: "n-3",
    title: "Appointment flow",
    detail: "ER reassessment slot moved earlier by the scheduling model.",
    type: NotificationTypeEnum.Clinical,
    severity: NotificationSeverityEnum.info,
    time: "18 min ago",
  },
  {
    id: "n-4",
    title: "Audit complete",
    detail: "Role matrix sync completed with no policy conflicts.",
    type: NotificationTypeEnum.System,
    severity: NotificationSeverityEnum.success,
    time: "1 hr ago",
  },
];
