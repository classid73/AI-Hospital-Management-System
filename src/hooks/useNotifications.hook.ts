import { useQuery } from "@tanstack/react-query";
import { mockRequest } from "api/axios";
import { notificationsSeed } from "data";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => mockRequest(notificationsSeed, 280),
    refetchInterval: 12_000,
  });
};
