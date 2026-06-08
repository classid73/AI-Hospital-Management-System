import type {
  NotificationSeverityEnum,
  NotificationTypeEnum,
} from "typescript/enums";

export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  type:
    | NotificationTypeEnum.AI
    | NotificationTypeEnum.Clinical
    | NotificationTypeEnum.Inventory
    | NotificationTypeEnum.System;
  severity:
    | NotificationSeverityEnum.info
    | NotificationSeverityEnum.warning
    | NotificationSeverityEnum.success
    | NotificationSeverityEnum.error;
  time: string;
};
