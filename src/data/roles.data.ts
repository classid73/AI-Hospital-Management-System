import { RoleEnum } from "typescript/enums";

export const roles: RoleEnum[] = [
  RoleEnum.SUPER_ADMIN,
  RoleEnum.ADMIN,
  RoleEnum.DOCTOR,
  RoleEnum.NURSE,
  RoleEnum.PHARMACIST,
  RoleEnum.LAB_TECHNICIAN,
  RoleEnum.PATIENT,
  RoleEnum.USER,
];
export const allRoles = roles;
export const clinicalRoles: RoleEnum[] = [
  RoleEnum.SUPER_ADMIN,
  RoleEnum.ADMIN,
  RoleEnum.DOCTOR,
  RoleEnum.NURSE,
];
export const adminRoles: RoleEnum[] = [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN];

export const roleAccent: Record<
  RoleEnum,
  { from: string; to: string; label: string }
> = {
  [RoleEnum.SUPER_ADMIN]: {
    from: "#7c3aed",
    to: "#06b6d4",
    label: "System command",
  },
  [RoleEnum.ADMIN]: {
    from: "#2563eb",
    to: "#22c55e",
    label: "Operations control",
  },
  [RoleEnum.DOCTOR]: {
    from: "#0891b2",
    to: "#34d399",
    label: "Clinical intelligence",
  },
  [RoleEnum.NURSE]: {
    from: "#14b8a6",
    to: "#60a5fa",
    label: "Care coordination",
  },
  [RoleEnum.PHARMACIST]: {
    from: "#16a34a",
    to: "#f59e0b",
    label: "Medication safety",
  },
  [RoleEnum.LAB_TECHNICIAN]: {
    from: "#9333ea",
    to: "#06b6d4",
    label: "Diagnostics lab",
  },
  [RoleEnum.PATIENT]: {
    from: "#0ea5e9",
    to: "#10b981",
    label: "Personal care",
  },
  [RoleEnum.USER]: { from: "#64748b", to: "#06b6d4", label: "Guest workspace" },
};
