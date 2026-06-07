import { createContext, useContext, useMemo, useState, type ElementType, type ReactNode } from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Paper,
  Skeleton,
  Slider,
  Stack,
  Switch,
  Tab,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, createTheme, ThemeProvider, useTheme, type PaletteMode, type SxProps, type Theme } from "@mui/material/styles";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import AnalyticsRounded from "@mui/icons-material/AnalyticsRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import MedicalServicesRounded from "@mui/icons-material/MedicalServicesRounded";
import LocalPharmacyRounded from "@mui/icons-material/LocalPharmacyRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import MonitorHeartRounded from "@mui/icons-material/MonitorHeartRounded";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import SmartToyRounded from "@mui/icons-material/SmartToyRounded";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ReceiptLongRounded from "@mui/icons-material/ReceiptLongRounded";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import MedicationRounded from "@mui/icons-material/MedicationRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import ShieldRounded from "@mui/icons-material/ShieldRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import HealthAndSafetyRounded from "@mui/icons-material/HealthAndSafetyRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import PersonAddAltRounded from "@mui/icons-material/PersonAddAltRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import { createBrowserRouter, Link as RouterLink, Outlet, RouterProvider, useLocation, useNavigate, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as ChartTooltipPrimitive,
  XAxis,
  YAxis,
} from "recharts";

type Role = "Super Admin" | "Admin" | "Doctor" | "Nurse" | "Pharmacist" | "Lab Technician" | "Patient" | "User";

type ChartPoint = {
  label: string;
  value: number;
  secondary?: number;
};

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  ward: string;
  condition: string;
  acuity: number;
  doctor: string;
  nurse: string;
  status: "Critical" | "Stable" | "Observation" | "Recovery";
  risk: number;
  lastVisit: string;
  insurance: string;
  phone: string;
  email: string;
  allergies: string;
  aiSummary: string;
  vitals: {
    heartRate: number;
    spo2: number;
    bp: string;
    temp: number;
  };
  diagnostics: ChartPoint[];
  timeline: string[];
  changes: string[];
  careTeam: string[];
};

type Appointment = {
  id: string;
  patient: string;
  type: string;
  clinician: string;
  time: string;
  date: string;
  status: "Confirmed" | "Waiting" | "Completed" | "Triage";
  priority: "Low" | "Medium" | "High";
  room: string;
  waitMins: number;
};

type StaffMember = {
  id: string;
  name: string;
  role: Exclude<Role, "Patient" | "User">;
  department: string;
  status: "Available" | "In Surgery" | "Rounds" | "Remote";
  load: number;
  nextSlot: string;
};

type Medicine = {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  expiry: string;
  demand: number;
  supplier: string;
  status: "Optimal" | "Low" | "Critical";
};

type LabReport = {
  id: string;
  patientId: string;
  patient: string;
  test: string;
  status: "Verified" | "Processing" | "Flagged";
  collectedAt: string;
  result: string;
  anomaly: number;
  aiFinding: string;
  chartData: ChartPoint[];
};

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  type: "AI" | "Clinical" | "Inventory" | "System";
  severity: "info" | "warning" | "success" | "error";
  time: string;
};

type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  scope: string;
  time: string;
};

type LivePatient = {
  id: string;
  name: string;
  ward: string;
  heartRate: number;
  spo2: number;
  respiratory: number;
  risk: number;
};

const drawerWidth = 304;

const roles: Role[] = ["Super Admin", "Admin", "Doctor", "Nurse", "Pharmacist", "Lab Technician", "Patient", "User"];
const allRoles = roles;
const clinicalRoles: Role[] = ["Super Admin", "Admin", "Doctor", "Nurse"];
const adminRoles: Role[] = ["Super Admin", "Admin"];

const roleAccent: Record<Role, { from: string; to: string; label: string }> = {
  "Super Admin": { from: "#7c3aed", to: "#06b6d4", label: "System command" },
  Admin: { from: "#2563eb", to: "#22c55e", label: "Operations control" },
  Doctor: { from: "#0891b2", to: "#34d399", label: "Clinical intelligence" },
  Nurse: { from: "#14b8a6", to: "#60a5fa", label: "Care coordination" },
  Pharmacist: { from: "#16a34a", to: "#f59e0b", label: "Medication safety" },
  "Lab Technician": { from: "#9333ea", to: "#06b6d4", label: "Diagnostics lab" },
  Patient: { from: "#0ea5e9", to: "#10b981", label: "Personal care" },
  User: { from: "#64748b", to: "#06b6d4", label: "Guest workspace" },
};

const roleWorkspace: Record<Role, { title: string; summary: string; focus: string; actions: string[] }> = {
  "Super Admin": {
    title: "Enterprise command center",
    summary: "Cross-facility governance with AI risk scoring, revenue health, access control, and service-level monitoring.",
    focus: "Audit AI recommendations before hospital-wide deployment.",
    actions: ["Review access matrix", "Approve policy change", "Open global analytics"],
  },
  Admin: {
    title: "Operations orchestration",
    summary: "Bed utilization, appointment throughput, staffing pressure, and patient flow in one operational cockpit.",
    focus: "Reduce emergency wait time by reallocating two triage nurses.",
    actions: ["Balance staffing", "Check billing queue", "Schedule executive report"],
  },
  Doctor: {
    title: "Doctor clinical console",
    summary: "Priority patients, AI notes, lab alerts, prescriptions, and follow-up appointments mapped to your roster.",
    focus: "Three patients need medication review based on vitals trend drift.",
    actions: ["Open patient details", "Review lab flags", "Dictate care plan"],
  },
  Nurse: {
    title: "Nurse station live board",
    summary: "Vitals, rounds, handoffs, care tasks, and escalation signals optimized for rapid bedside response.",
    focus: "Ward 7B has a rising respiratory risk in two monitored patients.",
    actions: ["Start rounds", "Update medication check", "Escalate vitals"],
  },
  Pharmacist: {
    title: "Pharmacy intelligence hub",
    summary: "Inventory demand forecasting, low-stock medicine alerts, prescription verification, and supplier health.",
    focus: "Insulin Glargine projected to cross reorder threshold in 28 hours.",
    actions: ["Create purchase order", "Validate prescriptions", "Review expiry risk"],
  },
  "Lab Technician": {
    title: "Diagnostics processing cockpit",
    summary: "Specimen queues, AI anomaly detection, flagged reports, and verification workflow for lab operations.",
    focus: "Two CBC panels show anomaly levels above the AI review threshold.",
    actions: ["Verify report", "Prioritize flagged tests", "Export lab packet"],
  },
  Patient: {
    title: "Personal health command",
    summary: "Appointments, lab summaries, medications, invoices, secure messages, and AI-prepared care reminders.",
    focus: "Your cardiology follow-up is confirmed and intake form is 80 percent complete.",
    actions: ["View my record", "Reschedule visit", "Message care team"],
  },
  User: {
    title: "Hospital service portal",
    summary: "Find doctors, request appointments, submit intake details, and track notifications from the hospital team.",
    focus: "Complete the digital intake form to speed up arrival.",
    actions: ["Book appointment", "Find a doctor", "Complete intake"],
  },
};

const navItems: Array<{ label: string; path: string; icon: ElementType; roles: Role[] }> = [
  { label: "Dashboard", path: "/", icon: DashboardRounded, roles: allRoles },
  { label: "AI Analytics", path: "/analytics", icon: AnalyticsRounded, roles: clinicalRoles },
  { label: "Patients", path: "/patients", icon: PeopleAltRounded, roles: ["Super Admin", "Admin", "Doctor", "Nurse", "Patient"] },
  { label: "Appointments", path: "/appointments", icon: EventAvailableRounded, roles: allRoles },
  { label: "Calendar", path: "/calendar", icon: CalendarMonthRounded, roles: allRoles },
  { label: "Staff", path: "/staff", icon: MedicalServicesRounded, roles: adminRoles },
  { label: "Doctors", path: "/doctors", icon: HealthAndSafetyRounded, roles: allRoles },
  { label: "Nurse Station", path: "/nursing", icon: FavoriteRounded, roles: clinicalRoles },
  { label: "Pharmacy", path: "/pharmacy", icon: LocalPharmacyRounded, roles: ["Super Admin", "Admin", "Doctor", "Nurse", "Pharmacist"] },
  { label: "Laboratory", path: "/labs", icon: BiotechRounded, roles: ["Super Admin", "Admin", "Doctor", "Nurse", "Lab Technician", "Patient"] },
  { label: "Live Monitoring", path: "/monitoring", icon: MonitorHeartRounded, roles: clinicalRoles },
  { label: "Billing", path: "/billing", icon: ReceiptLongRounded, roles: ["Super Admin", "Admin", "Patient"] },
  { label: "Intake Forms", path: "/forms/intake", icon: FactCheckRounded, roles: allRoles },
  { label: "Notifications", path: "/notifications", icon: NotificationsRounded, roles: allRoles },
  { label: "Activity", path: "/activity", icon: TimelineRounded, roles: ["Super Admin", "Admin", "Doctor", "Nurse", "Pharmacist", "Lab Technician"] },
  { label: "Access Control", path: "/access-control", icon: AdminPanelSettingsRounded, roles: adminRoles },
  { label: "AI Assistant", path: "/assistant", icon: SmartToyRounded, roles: allRoles },
  { label: "Profile", path: "/profile", icon: AccountCircleRounded, roles: allRoles },
  { label: "Settings", path: "/settings", icon: SettingsRounded, roles: allRoles },
];

const rolePermissions: Record<Role, string[]> = {
  "Super Admin": ["System", "Users", "Billing", "AI Models", "Audit", "Clinical", "Pharmacy", "Laboratory"],
  Admin: ["Users", "Billing", "Audit", "Clinical", "Pharmacy", "Laboratory"],
  Doctor: ["Clinical", "Laboratory", "Prescriptions", "Appointments"],
  Nurse: ["Clinical", "Vitals", "Appointments", "Care Tasks"],
  Pharmacist: ["Pharmacy", "Prescriptions", "Inventory"],
  "Lab Technician": ["Laboratory", "Reports", "Specimens"],
  Patient: ["Personal Record", "Appointments", "Billing"],
  User: ["Appointments", "Intake"],
};

const statusTone: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
  Critical: "error",
  Stable: "success",
  Observation: "warning",
  Recovery: "info",
  Confirmed: "success",
  Waiting: "warning",
  Completed: "success",
  Triage: "error",
  High: "error",
  Medium: "warning",
  Low: "success",
  Optimal: "success",
  Flagged: "error",
  Verified: "success",
  Processing: "warning",
};

const chartPalette = ["#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#38bdf8"];

const patientsSeed: Patient[] = [
  {
    id: "p-101",
    name: "Aarav Mehta",
    age: 54,
    gender: "Male",
    ward: "ICU 2A",
    condition: "Acute coronary syndrome",
    acuity: 92,
    doctor: "Dr. Maya Chen",
    nurse: "Nurse Olivia Hart",
    status: "Critical",
    risk: 88,
    lastVisit: "Today, 09:20",
    insurance: "Helix Prime",
    phone: "+1 415 772 0192",
    email: "aarav.mehta@example.com",
    allergies: "Penicillin",
    aiSummary: "AI detects elevated cardiac risk with mild oxygen instability. Recommend repeat troponin panel and tighter telemetry cadence.",
    vitals: { heartRate: 118, spo2: 93, bp: "148/96", temp: 99.1 },
    diagnostics: [
      { label: "Mon", value: 74, secondary: 96 },
      { label: "Tue", value: 81, secondary: 95 },
      { label: "Wed", value: 85, secondary: 94 },
      { label: "Thu", value: 88, secondary: 93 },
      { label: "Fri", value: 84, secondary: 95 },
    ],
    timeline: ["Admitted through emergency", "AI ECG review flagged ST deviation", "Cardiology consult assigned", "Medication reconciliation completed"],
    changes: ["Risk score increased from 76 to 88", "Nurse handoff added oxygen titration note", "Insurance pre-authorization approved"],
    careTeam: ["Cardiology", "ICU Nursing", "Pharmacy", "Lab Diagnostics"],
  },
  {
    id: "p-102",
    name: "Sophia Williams",
    age: 37,
    gender: "Female",
    ward: "Maternity 4C",
    condition: "Postnatal monitoring",
    acuity: 38,
    doctor: "Dr. Elena Ross",
    nurse: "Nurse Priya Nair",
    status: "Stable",
    risk: 21,
    lastVisit: "Today, 08:45",
    insurance: "CarePlus Gold",
    phone: "+1 646 882 1440",
    email: "sophia.williams@example.com",
    allergies: "None",
    aiSummary: "Recovery trend is favorable. AI recommends discharge readiness checklist within the next care cycle.",
    vitals: { heartRate: 82, spo2: 99, bp: "116/74", temp: 98.4 },
    diagnostics: [
      { label: "Mon", value: 32, secondary: 98 },
      { label: "Tue", value: 29, secondary: 99 },
      { label: "Wed", value: 24, secondary: 99 },
      { label: "Thu", value: 21, secondary: 99 },
      { label: "Fri", value: 19, secondary: 99 },
    ],
    timeline: ["Postnatal assessment completed", "Lactation consult scheduled", "Discharge education shared", "Follow-up appointment prepared"],
    changes: ["Discharge readiness moved to 92 percent", "Pain score reduced from 4 to 2", "Care plan translated to patient portal"],
    careTeam: ["Maternity", "Nursing", "Patient Education"],
  },
  {
    id: "p-103",
    name: "Noah Johnson",
    age: 68,
    gender: "Male",
    ward: "Neuro 7B",
    condition: "Stroke recovery",
    acuity: 71,
    doctor: "Dr. Liam Carter",
    nurse: "Nurse Grace Kim",
    status: "Observation",
    risk: 64,
    lastVisit: "Yesterday, 17:10",
    insurance: "Blue Shield",
    phone: "+1 212 555 8831",
    email: "noah.johnson@example.com",
    allergies: "Sulfa drugs",
    aiSummary: "AI movement model shows slower left-side response. Recommend therapy intensity adjustment and repeat neuro checks.",
    vitals: { heartRate: 96, spo2: 97, bp: "132/84", temp: 98.8 },
    diagnostics: [
      { label: "Mon", value: 68, secondary: 95 },
      { label: "Tue", value: 66, secondary: 96 },
      { label: "Wed", value: 63, secondary: 97 },
      { label: "Thu", value: 64, secondary: 97 },
      { label: "Fri", value: 61, secondary: 98 },
    ],
    timeline: ["CT scan reviewed", "Speech therapy started", "Neuro checks every four hours", "Family care conference scheduled"],
    changes: ["Therapy load increased by 12 percent", "Diet advanced to soft solids", "MRI follow-up requested"],
    careTeam: ["Neurology", "Rehabilitation", "Speech Therapy"],
  },
  {
    id: "p-104",
    name: "Isabella Garcia",
    age: 29,
    gender: "Female",
    ward: "ER Fast Track",
    condition: "Asthma exacerbation",
    acuity: 55,
    doctor: "Dr. Omar Singh",
    nurse: "Nurse Mia Lopez",
    status: "Observation",
    risk: 49,
    lastVisit: "Today, 11:05",
    insurance: "United Health",
    phone: "+1 305 440 7001",
    email: "isabella.garcia@example.com",
    allergies: "Latex",
    aiSummary: "Respiratory load is improving after nebulization. AI recommends reassessment before discharge decision.",
    vitals: { heartRate: 104, spo2: 96, bp: "122/80", temp: 98.6 },
    diagnostics: [
      { label: "12:00", value: 61, secondary: 93 },
      { label: "13:00", value: 56, secondary: 94 },
      { label: "14:00", value: 51, secondary: 96 },
      { label: "15:00", value: 49, secondary: 96 },
      { label: "16:00", value: 46, secondary: 97 },
    ],
    timeline: ["Peak flow recorded", "Nebulizer administered", "Chest X-ray cleared", "Observation timer started"],
    changes: ["SPO2 improved from 93 to 96", "Wheeze severity marked moderate", "Discharge review moved up 30 minutes"],
    careTeam: ["Emergency", "Respiratory Therapy", "Nursing"],
  },
  {
    id: "p-105",
    name: "Ethan Brown",
    age: 46,
    gender: "Male",
    ward: "Surgery 5D",
    condition: "Appendectomy recovery",
    acuity: 33,
    doctor: "Dr. Hannah Lee",
    nurse: "Nurse Daniel Reed",
    status: "Recovery",
    risk: 28,
    lastVisit: "Today, 07:35",
    insurance: "Aetna",
    phone: "+1 617 555 9090",
    email: "ethan.brown@example.com",
    allergies: "Codeine",
    aiSummary: "Postoperative recovery is stable. AI suggests early ambulation and pain medication taper review.",
    vitals: { heartRate: 76, spo2: 98, bp: "118/72", temp: 98.2 },
    diagnostics: [
      { label: "Mon", value: 42, secondary: 97 },
      { label: "Tue", value: 37, secondary: 98 },
      { label: "Wed", value: 31, secondary: 98 },
      { label: "Thu", value: 28, secondary: 98 },
      { label: "Fri", value: 25, secondary: 99 },
    ],
    timeline: ["Surgery completed", "Wound check normal", "Ambulation target set", "Nutrition plan updated"],
    changes: ["Pain score reduced to 3", "Antibiotic course confirmed", "Discharge target set for tomorrow"],
    careTeam: ["Surgery", "Nursing", "Pharmacy"],
  },
  {
    id: "p-106",
    name: "Mia Thompson",
    age: 8,
    gender: "Female",
    ward: "Pediatrics 3A",
    condition: "Dehydration",
    acuity: 41,
    doctor: "Dr. Victor Nguyen",
    nurse: "Nurse Hannah Scott",
    status: "Stable",
    risk: 24,
    lastVisit: "Yesterday, 19:30",
    insurance: "FamilyCare",
    phone: "+1 718 555 0108",
    email: "guardian.mia@example.com",
    allergies: "Peanuts",
    aiSummary: "Hydration curve is normalizing. AI recommends oral intake challenge before step-down.",
    vitals: { heartRate: 91, spo2: 99, bp: "104/68", temp: 98.7 },
    diagnostics: [
      { label: "Mon", value: 52, secondary: 97 },
      { label: "Tue", value: 43, secondary: 98 },
      { label: "Wed", value: 31, secondary: 98 },
      { label: "Thu", value: 24, secondary: 99 },
      { label: "Fri", value: 22, secondary: 99 },
    ],
    timeline: ["IV fluids started", "Electrolytes normalized", "Pediatric review completed", "Guardian instructions drafted"],
    changes: ["Urine output normalized", "IV rate reduced", "Oral challenge scheduled"],
    careTeam: ["Pediatrics", "Nursing", "Nutrition"],
  },
];

const appointmentsSeed: Appointment[] = [
  { id: "a-301", patient: "Aarav Mehta", type: "Cardiology review", clinician: "Dr. Maya Chen", time: "09:40", date: "Mon", status: "Triage", priority: "High", room: "ICU 2A", waitMins: 4 },
  { id: "a-302", patient: "Sophia Williams", type: "Discharge planning", clinician: "Dr. Elena Ross", time: "10:15", date: "Mon", status: "Confirmed", priority: "Low", room: "Maternity 4C", waitMins: 0 },
  { id: "a-303", patient: "Noah Johnson", type: "Neuro consult", clinician: "Dr. Liam Carter", time: "11:30", date: "Tue", status: "Waiting", priority: "Medium", room: "Neuro 7B", waitMins: 18 },
  { id: "a-304", patient: "Isabella Garcia", type: "Respiratory reassessment", clinician: "Dr. Omar Singh", time: "12:05", date: "Tue", status: "Confirmed", priority: "Medium", room: "ER 3", waitMins: 2 },
  { id: "a-305", patient: "Ethan Brown", type: "Surgical follow-up", clinician: "Dr. Hannah Lee", time: "14:20", date: "Wed", status: "Completed", priority: "Low", room: "Surgery 5D", waitMins: 0 },
  { id: "a-306", patient: "Mia Thompson", type: "Pediatric review", clinician: "Dr. Victor Nguyen", time: "15:45", date: "Thu", status: "Confirmed", priority: "Low", room: "Peds 3A", waitMins: 0 },
];

const staffSeed: StaffMember[] = [
  { id: "s-201", name: "Dr. Maya Chen", role: "Doctor", department: "Cardiology", status: "Rounds", load: 78, nextSlot: "11:20" },
  { id: "s-202", name: "Dr. Elena Ross", role: "Doctor", department: "Maternity", status: "Available", load: 52, nextSlot: "10:40" },
  { id: "s-203", name: "Nurse Olivia Hart", role: "Nurse", department: "ICU", status: "Rounds", load: 83, nextSlot: "Now" },
  { id: "s-204", name: "Nurse Priya Nair", role: "Nurse", department: "Maternity", status: "Available", load: 48, nextSlot: "12:00" },
  { id: "s-205", name: "Amara Woods", role: "Pharmacist", department: "Pharmacy", status: "Remote", load: 66, nextSlot: "13:15" },
  { id: "s-206", name: "Leo Martinez", role: "Lab Technician", department: "Diagnostics", status: "Available", load: 59, nextSlot: "10:10" },
  { id: "s-207", name: "Morgan Blake", role: "Admin", department: "Operations", status: "Available", load: 44, nextSlot: "Now" },
];

const medicineSeed: Medicine[] = [
  { id: "m-401", name: "Insulin Glargine", category: "Endocrine", stock: 38, threshold: 45, expiry: "2026-09-18", demand: 82, supplier: "MediCore", status: "Low" },
  { id: "m-402", name: "Ceftriaxone", category: "Antibiotic", stock: 120, threshold: 60, expiry: "2027-01-11", demand: 68, supplier: "PharmaNova", status: "Optimal" },
  { id: "m-403", name: "Albuterol Inhaler", category: "Respiratory", stock: 18, threshold: 30, expiry: "2026-06-02", demand: 76, supplier: "AirRx", status: "Critical" },
  { id: "m-404", name: "Apixaban", category: "Anticoagulant", stock: 64, threshold: 40, expiry: "2026-12-22", demand: 54, supplier: "MediCore", status: "Optimal" },
  { id: "m-405", name: "Morphine Sulfate", category: "Analgesic", stock: 42, threshold: 28, expiry: "2026-08-05", demand: 49, supplier: "CareChem", status: "Optimal" },
];

const labReportsSeed: LabReport[] = [
  {
    id: "l-501",
    patientId: "p-101",
    patient: "Aarav Mehta",
    test: "Troponin I",
    status: "Flagged",
    collectedAt: "Today, 08:55",
    result: "0.14 ng/mL",
    anomaly: 86,
    aiFinding: "Pattern suggests acute myocardial stress. Correlate with ECG and cardiology plan.",
    chartData: [
      { label: "Baseline", value: 22 },
      { label: "Sample 1", value: 58 },
      { label: "Sample 2", value: 86 },
    ],
  },
  {
    id: "l-502",
    patientId: "p-103",
    patient: "Noah Johnson",
    test: "CBC Panel",
    status: "Verified",
    collectedAt: "Yesterday, 16:20",
    result: "WBC 8.4 K/uL",
    anomaly: 24,
    aiFinding: "No acute hematology pattern detected. Continue scheduled monitoring.",
    chartData: [
      { label: "WBC", value: 42 },
      { label: "RBC", value: 61 },
      { label: "PLT", value: 54 },
    ],
  },
  {
    id: "l-503",
    patientId: "p-104",
    patient: "Isabella Garcia",
    test: "ABG Panel",
    status: "Processing",
    collectedAt: "Today, 13:35",
    result: "Pending",
    anomaly: 49,
    aiFinding: "Awaiting pCO2 confirmation. Respiratory trend is improving after intervention.",
    chartData: [
      { label: "pH", value: 62 },
      { label: "pO2", value: 70 },
      { label: "pCO2", value: 45 },
    ],
  },
  {
    id: "l-504",
    patientId: "p-106",
    patient: "Mia Thompson",
    test: "Electrolytes",
    status: "Verified",
    collectedAt: "Today, 06:10",
    result: "Normalizing",
    anomaly: 18,
    aiFinding: "Hydration response is favorable. Oral challenge is clinically reasonable.",
    chartData: [
      { label: "Na", value: 54 },
      { label: "K", value: 49 },
      { label: "Cl", value: 51 },
    ],
  },
];

const notificationsSeed: NotificationItem[] = [
  { id: "n-1", title: "AI risk escalation", detail: "Aarav Mehta crossed the cardiac risk threshold.", type: "AI", severity: "error", time: "2 min ago" },
  { id: "n-2", title: "Inventory reorder", detail: "Albuterol Inhaler is projected to stock out in 19 hours.", type: "Inventory", severity: "warning", time: "8 min ago" },
  { id: "n-3", title: "Appointment flow", detail: "ER reassessment slot moved earlier by the scheduling model.", type: "Clinical", severity: "info", time: "18 min ago" },
  { id: "n-4", title: "Audit complete", detail: "Role matrix sync completed with no policy conflicts.", type: "System", severity: "success", time: "1 hr ago" },
];

const activitiesSeed: ActivityItem[] = [
  { id: "act-1", actor: "Dr. Maya Chen", action: "approved AI cardiac recommendation", scope: "Aarav Mehta", time: "09:24" },
  { id: "act-2", actor: "Nurse Priya Nair", action: "completed discharge checklist", scope: "Sophia Williams", time: "09:10" },
  { id: "act-3", actor: "Amara Woods", action: "flagged low stock reorder", scope: "Albuterol Inhaler", time: "08:58" },
  { id: "act-4", actor: "Leo Martinez", action: "verified electrolyte report", scope: "Mia Thompson", time: "08:31" },
  { id: "act-5", actor: "Morgan Blake", action: "updated access policy", scope: "Lab Technician", time: "07:45" },
];

const admissionsTrend = [
  { day: "Mon", admissions: 142, discharge: 118, ai: 78 },
  { day: "Tue", admissions: 158, discharge: 126, ai: 82 },
  { day: "Wed", admissions: 149, discharge: 137, ai: 84 },
  { day: "Thu", admissions: 172, discharge: 145, ai: 88 },
  { day: "Fri", admissions: 181, discharge: 153, ai: 91 },
  { day: "Sat", admissions: 133, discharge: 122, ai: 87 },
  { day: "Sun", admissions: 119, discharge: 111, ai: 89 },
];

const departmentLoad = [
  { name: "ICU", load: 84, forecast: 91 },
  { name: "ER", load: 76, forecast: 82 },
  { name: "Surgery", load: 61, forecast: 68 },
  { name: "Maternity", load: 47, forecast: 43 },
  { name: "Peds", load: 53, forecast: 49 },
];

const appointmentMix = [
  { name: "Confirmed", value: 52 },
  { name: "Waiting", value: 18 },
  { name: "Triage", value: 12 },
  { name: "Completed", value: 18 },
];

const liveBase = [
  { id: "p-101", name: "Aarav Mehta", ward: "ICU 2A", heartRate: 116, spo2: 93, respiratory: 22, risk: 88 },
  { id: "p-103", name: "Noah Johnson", ward: "Neuro 7B", heartRate: 94, spo2: 97, respiratory: 18, risk: 64 },
  { id: "p-104", name: "Isabella Garcia", ward: "ER 3", heartRate: 102, spo2: 96, respiratory: 21, risk: 49 },
  { id: "p-106", name: "Mia Thompson", ward: "Peds 3A", heartRate: 91, spo2: 99, respiratory: 17, risk: 24 },
];

const api = axios.create({ baseURL: "/api/heliosai" });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 45_000,
      refetchOnWindowFocus: false,
    },
  },
});

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

async function mockRequest<T>(data: T, delay = 360): Promise<T> {
  const response = await api.request<T>({
    url: "/mock",
    method: "GET",
    adapter: async (config) => {
      await wait(delay);
      return { data, status: 200, statusText: "OK", headers: {}, config };
    },
  });
  return response.data;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function makeLivePatients(): LivePatient[] {
  return liveBase.map((patient, index) => {
    const variance = Math.sin(Date.now() / (2100 + index * 400)) * 3 + Math.random() * 3;
    return {
      ...patient,
      heartRate: Math.round(clamp(patient.heartRate + variance, 58, 132)),
      spo2: Math.round(clamp(patient.spo2 + variance / 5, 88, 100)),
      respiratory: Math.round(clamp(patient.respiratory + variance / 3, 12, 30)),
      risk: Math.round(clamp(patient.risk + variance, 5, 98)),
    };
  });
}

function usePatients() {
  return useQuery({ queryKey: ["patients"], queryFn: () => mockRequest(patientsSeed) });
}

function useAppointments() {
  return useQuery({ queryKey: ["appointments"], queryFn: () => mockRequest(appointmentsSeed) });
}

function useStaff() {
  return useQuery({ queryKey: ["staff"], queryFn: () => mockRequest(staffSeed) });
}

function useMedicines() {
  return useQuery({ queryKey: ["medicines"], queryFn: () => mockRequest(medicineSeed) });
}

function useLabs() {
  return useQuery({ queryKey: ["labs"], queryFn: () => mockRequest(labReportsSeed) });
}

function useNotifications() {
  return useQuery({ queryKey: ["notifications"], queryFn: () => mockRequest(notificationsSeed, 280), refetchInterval: 12_000 });
}

function useActivities() {
  return useQuery({ queryKey: ["activities"], queryFn: () => mockRequest(activitiesSeed) });
}

function useLivePatients() {
  return useQuery({ queryKey: ["live-patients"], queryFn: () => mockRequest(makeLivePatients(), 220), refetchInterval: 3_500 });
}

type AppState = {
  role: Role;
  setRole: (role: Role) => void;
  mode: PaletteMode;
  toggleMode: () => void;
};

const AppStateContext = createContext<AppState | null>(null);

function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateContext");
  }
  return context;
}

function buildTheme(mode: PaletteMode) {
  const dark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#22d3ee" : "#0284c7" },
      secondary: { main: dark ? "#a78bfa" : "#7c3aed" },
      success: { main: "#10b981" },
      warning: { main: "#f59e0b" },
      error: { main: "#ef4444" },
      background: {
        default: dark ? "#06111f" : "#eef8ff",
        paper: dark ? "rgba(9, 22, 43, 0.78)" : "rgba(255,255,255,0.76)",
      },
      text: {
        primary: dark ? "#f8fafc" : "#082f49",
        secondary: dark ? "#a8bfd4" : "#46657b",
      },
    },
    shape: { borderRadius: 24 },
    typography: {
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.055em" },
      h2: { fontWeight: 800, letterSpacing: "-0.045em" },
      h3: { fontWeight: 800, letterSpacing: "-0.04em" },
      h4: { fontWeight: 800, letterSpacing: "-0.035em" },
      h5: { fontWeight: 750, letterSpacing: "-0.025em" },
      h6: { fontWeight: 750, letterSpacing: "-0.015em" },
      button: { textTransform: "none", fontWeight: 750 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            minHeight: 42,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 700,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },
  });
}

function AppProviders({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const [role, setRole] = useState<Role>("Super Admin");
  const theme = useMemo(() => buildTheme(mode), [mode]);
  const value = useMemo<AppState>(
    () => ({ role, setRole, mode, toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark")) }),
    [mode, role],
  );

  return (
    <AppStateContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppStateContext.Provider>
  );
}

function glassPanel(theme: Theme): SxProps<Theme> {
  const dark = theme.palette.mode === "dark";
  return {
    position: "relative",
    overflow: "hidden",
    borderRadius: { xs: 4, md: 6 },
    border: `1px solid ${alpha(dark ? "#dff9ff" : "#0284c7", dark ? 0.14 : 0.16)}`,
    background: dark
      ? "linear-gradient(145deg, rgba(10,24,47,0.82), rgba(6,17,31,0.66))"
      : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(232,248,255,0.68))",
    backdropFilter: "blur(22px)",
    boxShadow: dark
      ? "18px 18px 46px rgba(0,0,0,0.32), -10px -10px 30px rgba(71,189,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "18px 18px 42px rgba(14,116,144,0.13), -16px -16px 34px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)",
  };
}

function GlassSurface({ children, sx, interactive = false }: { children: ReactNode; sx?: SxProps<Theme>; interactive?: boolean }) {
  return (
    <Box
      sx={[
        (theme) => glassPanel(theme),
        interactive
          ? {
              transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
              "&:hover": { transform: "translateY(-3px)", borderColor: "primary.main" },
            }
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <Box sx={{ width: "100%", maxWidth: 1680, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, pb: 8 }}>{children}</Box>
    </motion.div>
  );
}

function GradientText({ children }: { children: ReactNode }) {
  const { role } = useAppState();
  const accent = roleAccent[role];
  return (
    <Box component="span" sx={{ background: `linear-gradient(120deg, ${accent.from}, ${accent.to})`, WebkitBackgroundClip: "text", color: "transparent" }}>
      {children}
    </Box>
  );
}

function StatusChip({ value }: { value: string }) {
  return <Chip size="small" label={value} color={statusTone[value] ?? "default"} variant="outlined" sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0.42) }} />;
}

function LivePulse({ label = "Live" }: { label?: string }) {
  return (
    <Chip
      size="small"
      label={label}
      icon={
        <Box
          component={motion.span}
          aria-hidden="true"
          animate={{ scale: [1, 1.55, 1], opacity: [0.9, 0.35, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main", ml: 1 }}
        />
      }
      sx={{ border: "1px solid", borderColor: "success.main", bgcolor: (theme) => alpha(theme.palette.success.main, 0.1) }}
    />
  );
}

function PageHeader({ kicker, title, description, actions }: { kicker?: string; title: ReactNode; description?: string; actions?: ReactNode }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
      <Box>
        {kicker ? (
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 850, letterSpacing: "0.16em" }}>
            {kicker}
          </Typography>
        ) : null}
        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 32, md: 44 }, lineHeight: 1.02 }}>
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 780, fontSize: { xs: 15, md: 17 } }}>
            {description}
          </Typography>
        ) : null}
      </Box>
      {actions ? <Stack direction="row" spacing={1.25} sx={{ flexWrap: "wrap" }}>{actions}</Stack> : null}
    </Stack>
  );
}

const toneMap = {
  cyan: ["#06b6d4", "#22d3ee"],
  emerald: ["#10b981", "#34d399"],
  violet: ["#8b5cf6", "#c084fc"],
  amber: ["#f59e0b", "#fbbf24"],
  rose: ["#ef4444", "#fb7185"],
} as const;

type Tone = keyof typeof toneMap;

function MetricCard({ label, value, detail, icon: Icon, tone = "cyan", progress }: { label: string; value: string; detail: string; icon: ElementType; tone?: Tone; progress?: number }) {
  const [from, to] = toneMap[tone];
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <GlassSurface interactive sx={{ p: 2.5, minHeight: 176 }}>
        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: 52, height: 52, borderRadius: 3.5, display: "grid", placeItems: "center", background: `linear-gradient(135deg, ${from}, ${to})`, color: "white", boxShadow: `0 16px 32px ${alpha(from, 0.28)}` }}>
              <Icon />
            </Box>
            <TrendingUpRounded sx={{ color: to }} />
          </Stack>
          <Box>
            <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 700 }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
          <Typography color="text.secondary" variant="body2">
            {detail}
          </Typography>
          {typeof progress === "number" ? <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 99, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08) }} /> : null}
        </Stack>
        <Box sx={{ position: "absolute", inset: "auto -24px -42px auto", width: 130, height: 130, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(to, 0.3)}, transparent 68%)` }} />
      </GlassSurface>
    </motion.div>
  );
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | string; color?: string }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }
  return (
    <GlassSurface sx={{ p: 1.5, borderRadius: 3 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Stack key={`${entry.name}-${entry.value}`} direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: entry.color ?? "primary.main" }} />
          <Typography variant="body2" sx={{ fontWeight: 800 }}>
            {entry.name}: {entry.value}
          </Typography>
        </Stack>
      ))}
    </GlassSurface>
  );
}

function LoadingGrid({ count = 4 }: { count?: number }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
      {Array.from({ length: count }).map((_, index) => (
        <GlassSurface key={index} sx={{ p: 2.5 }}>
          <Skeleton variant="rounded" height={48} width={64} />
          <Skeleton sx={{ mt: 2 }} height={38} />
          <Skeleton height={24} width="70%" />
        </GlassSurface>
      ))}
    </Box>
  );
}

function getRouteRoles(pathname: string): Role[] {
  const sorted = [...navItems].sort((a, b) => b.path.length - a.path.length);
  const match = sorted.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)));
  if (pathname.startsWith("/patients/")) {
    return ["Super Admin", "Admin", "Doctor", "Nurse", "Patient"];
  }
  if (pathname.startsWith("/pharmacy/")) {
    return ["Super Admin", "Admin", "Doctor", "Nurse", "Pharmacist"];
  }
  if (pathname.startsWith("/labs/")) {
    return ["Super Admin", "Admin", "Doctor", "Nurse", "Lab Technician", "Patient"];
  }
  return match?.roles ?? allRoles;
}

function AppLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { role } = useAppState();
  const routeRoles = getRouteRoles(location.pathname);
  const restricted = !routeRoles.includes(role);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        color: "text.primary",
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at top left, rgba(34,211,238,0.16), transparent 34%), radial-gradient(circle at 90% 8%, rgba(124,58,237,0.18), transparent 28%), linear-gradient(135deg, #06111f 0%, #0a1930 52%, #071524 100%)"
            : "radial-gradient(circle at top left, rgba(14,165,233,0.22), transparent 34%), radial-gradient(circle at 90% 8%, rgba(16,185,129,0.18), transparent 28%), linear-gradient(135deg, #eef8ff 0%, #f8fdff 54%, #e8fbf6 100%)",
      }}
    >
      <Box component={motion.div} className="aurora-orb aurora-orb-one" animate={{ y: [0, 18, 0], opacity: [0.45, 0.7, 0.45] }} transition={{ repeat: Infinity, duration: 9 }} />
      <Box component={motion.div} className="aurora-orb aurora-orb-two" animate={{ y: [0, -20, 0], opacity: [0.38, 0.65, 0.38] }} transition={{ repeat: Infinity, duration: 11 }} />
      <SideNav open={isDesktop || mobileOpen} variant={isDesktop ? "permanent" : "temporary"} onClose={() => setMobileOpen(false)} />
      <Box sx={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <TopBar onMenu={() => setMobileOpen(true)} showMenu={!isDesktop} />
        {restricted ? (
          <Box sx={{ px: { xs: 2, md: 3 }, pt: 2, maxWidth: 1680, mx: "auto" }}>
            <Alert severity="warning" variant="outlined" sx={{ borderRadius: 4, bgcolor: (themeArg) => alpha(themeArg.palette.warning.main, 0.08) }}>
              Current role can preview this workspace, but write actions are limited. Switch roles from the header to see the authorized experience.
            </Alert>
          </Box>
        ) : null}
        <Outlet />
      </Box>
      <FloatingAssistant />
    </Box>
  );
}

function SideNav({ open, variant, onClose }: { open: boolean; variant: "permanent" | "temporary"; onClose: () => void }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { role } = useAppState();
  const accent = roleAccent[role];
  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: variant === "permanent" ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          border: 0,
          color: "text.primary",
          background: theme.palette.mode === "dark" ? "rgba(6,17,31,0.78)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(26px)",
          boxShadow: theme.palette.mode === "dark" ? "12px 0 40px rgba(0,0,0,0.26)" : "12px 0 36px rgba(14,116,144,0.11)",
        },
      }}
    >
      <Stack sx={{ height: "100%", p: 2 }} spacing={2}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 48, height: 48, borderRadius: 4, display: "grid", placeItems: "center", color: "white", background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, boxShadow: `0 18px 38px ${alpha(accent.from, 0.28)}` }}>
            <HealthAndSafetyRounded />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              HeliosAI
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              Hospital OS
            </Typography>
          </Box>
          {variant === "temporary" ? (
            <IconButton aria-label="Close navigation" onClick={onClose}>
              <ChevronLeftRounded />
            </IconButton>
          ) : null}
        </Stack>

        <GlassSurface sx={{ p: 1.6, borderRadius: 4 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
            Active role
          </Typography>
          <Stack direction="row" spacing={1.2} sx={{ mt: 1, alignItems: "center" }}>
            <Avatar sx={{ width: 36, height: 36, background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, fontWeight: 900 }}>{role.slice(0, 1)}</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 900 }}>
                {role}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {accent.label}
              </Typography>
            </Box>
          </Stack>
        </GlassSurface>

        <List sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
          {visibleItems.map((item) => {
            const selected = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <ListItemButton
                key={item.path}
                selected={selected}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                sx={{
                  mb: 0.45,
                  borderRadius: 3.5,
                  minHeight: 48,
                  color: selected ? "white" : "text.secondary",
                  background: selected ? `linear-gradient(135deg, ${accent.from}, ${accent.to})` : "transparent",
                  boxShadow: selected ? `0 16px 34px ${alpha(accent.from, 0.26)}` : "none",
                  "&.Mui-selected:hover": { background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` },
                  "&:hover": { bgcolor: alpha(accent.from, 0.12), color: "text.primary" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: selected ? 900 : 750, fontSize: 14 }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>

        <GlassSurface sx={{ p: 2, borderRadius: 4 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <AutoAwesomeRounded color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 900 }}>
              AI readiness 94%
            </Typography>
          </Stack>
          <LinearProgress variant="determinate" value={94} sx={{ mt: 1.5, height: 8, borderRadius: 99 }} />
        </GlassSurface>
      </Stack>
    </Drawer>
  );
}

function TopBar({ onMenu, showMenu }: { onMenu: () => void; showMenu: boolean }) {
  const { role, setRole, mode, toggleMode } = useAppState();
  const { data: notifications = [] } = useNotifications();
  const navigate = useNavigate();
  const accent = roleAccent[role];

  return (
    <AppBar position="sticky" elevation={0} sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "transparent", color: "text.primary", backdropFilter: "blur(18px)", borderBottom: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}` }}>
      <Toolbar sx={{ minHeight: { xs: 72, md: 82 }, gap: 1.5 }}>
        {showMenu ? (
          <IconButton aria-label="Open navigation" onClick={onMenu}>
            <MenuRounded />
          </IconButton>
        ) : null}
        <TextField
          placeholder="Search patients, staff, reports"
          aria-label="Global search"
          sx={{ display: { xs: "none", md: "block" }, maxWidth: 420, flex: 1 }}
          slotProps={{
            input: {
              startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ flex: 1 }} />
        <TextField select label="Role" value={role} onChange={(event) => setRole(event.target.value as Role)} sx={{ minWidth: { xs: 138, sm: 190 } }}>
          {roles.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton aria-label="Toggle color mode" onClick={toggleMode}>
            {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification center">
          <IconButton aria-label="Open notifications" onClick={() => navigate("/notifications")}>
            <Badge color="error" badgeContent={notifications.length}>
              <NotificationsRounded />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile">
          <IconButton aria-label="Open profile" onClick={() => navigate("/profile")} sx={{ p: 0.5 }}>
            <Avatar sx={{ width: 38, height: 38, background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, fontWeight: 900 }}>{role.slice(0, 1)}</Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  pageSize?: number;
};

function DataTable<T extends object>({ data, columns, searchPlaceholder = "Search", onRowClick, pageSize = 6 }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <GlassSurface sx={{ p: { xs: 1, md: 1.5 } }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ p: 1, alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between" }}>
        <TextField
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          slotProps={{
            input: {
              startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: { md: 360 } }}
        />
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "flex-end" }}>
          <Chip label={`${table.getFilteredRowModel().rows.length} records`} color="primary" variant="outlined" />
          <Button startIcon={<DownloadRounded />} variant="outlined">
            Export
          </Button>
        </Stack>
      </Stack>
      <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent", borderRadius: 4, overflowX: "auto" }}>
        <MuiTable aria-label="Data grid" sx={{ minWidth: 760 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableCell key={header.id} sx={{ borderColor: (theme) => alpha(theme.palette.text.primary, 0.08), color: "text.secondary", fontWeight: 900 }}>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <TableSortLabel active={Boolean(sorted)} direction={sorted === "desc" ? "desc" : "asc"} onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableSortLabel>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                hover
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                sx={{ cursor: onRowClick ? "pointer" : "default", "& td": { borderColor: (theme) => alpha(theme.palette.text.primary, 0.07) } }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 6, 10, 15]}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_event, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(event) => {
          table.setPageSize(Number(event.target.value));
          table.setPageIndex(0);
        }}
      />
    </GlassSurface>
  );
}

function DashboardPage() {
  const { role } = useAppState();
  const patientsQuery = usePatients();
  const appointmentsQuery = useAppointments();
  const medicinesQuery = useMedicines();
  const liveQuery = useLivePatients();
  const patients = patientsQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];
  const medicines = medicinesQuery.data ?? [];
  const criticalPatients = patients.filter((patient) => patient.status === "Critical").length;
  const lowStock = medicines.filter((medicine) => medicine.status !== "Optimal").length;
  const workspace = roleWorkspace[role];
  const loading = patientsQuery.isLoading || appointmentsQuery.isLoading || medicinesQuery.isLoading;

  return (
    <PageFrame>
      <PageHeader
        kicker="AI-powered hospital management system"
        title={
          <>
            <GradientText>HeliosAI</GradientText> dashboard
          </>
        }
        description={workspace.summary}
        actions={
          <>
            <LivePulse />
            <Button variant="contained" startIcon={<AutoAwesomeRounded />} component={RouterLink} to="/assistant">
              Ask AI
            </Button>
          </>
        }
      />

      <GlassSurface sx={{ p: { xs: 2.2, md: 3 }, mb: 2.5 }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ alignItems: { lg: "center" }, justifyContent: "space-between" }}>
            <Box>
              <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 900 }}>
                {role} workspace
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                {workspace.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
                {workspace.focus}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
              {workspace.actions.map((action) => (
                <Chip key={action} label={action} color="primary" variant="outlined" />
              ))}
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ position: "absolute", inset: "auto -80px -120px auto", width: 280, height: 280, borderRadius: "50%", background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.24)}, transparent 70%)` }} />
      </GlassSurface>

      {loading ? (
        <LoadingGrid />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
          <MetricCard label="Active patients" value={`${patients.length * 34}`} detail={`${criticalPatients} critical AI escalations`} icon={PeopleAltRounded} tone="cyan" progress={76} />
          <MetricCard label="AI risk precision" value="94.6%" detail="Model confidence across live workflows" icon={AutoAwesomeRounded} tone="violet" progress={95} />
          <MetricCard label="Appointments today" value={`${appointments.length * 12}`} detail="18 minute average wait time" icon={CalendarMonthRounded} tone="emerald" progress={68} />
          <MetricCard label="Inventory signals" value={`${lowStock}`} detail="Medicines under reorder watch" icon={MedicationRounded} tone="amber" progress={42} />
        </Box>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "1.35fr 0.9fr" }, gap: 2, mt: 2 }}>
        <GlassSurface sx={{ p: 2.5, minHeight: 380 }}>
          <SectionHeading icon={InsightsRounded} title="Predictive patient flow" subtitle="Admissions, discharges, and AI confidence for capacity planning" />
          <Box sx={{ height: 295 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={admissionsTrend} margin={{ left: -18, right: 18, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="admissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="discharges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                <XAxis dataKey="day" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                <ChartTooltipPrimitive content={<ChartTooltip />} />
                <Area type="monotone" dataKey="admissions" stroke="#06b6d4" fill="url(#admissions)" strokeWidth={3} />
                <Area type="monotone" dataKey="discharge" stroke="#10b981" fill="url(#discharges)" strokeWidth={3} />
                <Line type="monotone" dataKey="ai" stroke="#a78bfa" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>

        <LiveVitalsWidget patients={liveQuery.data ?? []} loading={liveQuery.isLoading} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr 1fr" }, gap: 2, mt: 2 }}>
        <AiInsightsPanel />
        <AppointmentQueue appointments={appointments} />
        <InventorySignals medicines={medicines} />
      </Box>
    </PageFrame>
  );
}

function SectionHeading({ icon: Icon, title, subtitle, action }: { icon: ElementType; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: "flex-start", justifyContent: "space-between" }}>
      <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
        <Box sx={{ width: 38, height: 38, borderRadius: 3, display: "grid", placeItems: "center", color: "primary.main", bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }}>
          <Icon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="h6">{title}</Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </Stack>
      {action}
    </Stack>
  );
}

function LiveVitalsWidget({ patients, loading }: { patients: LivePatient[]; loading: boolean }) {
  return (
    <GlassSurface sx={{ p: 2.5, minHeight: 380 }}>
      <SectionHeading icon={MonitorHeartRounded} title="Live patient monitoring" subtitle="Real-time vitals refresh every few seconds" action={<LivePulse label="Realtime" />} />
      {loading ? (
        <Stack spacing={1.5}>
          <Skeleton height={64} />
          <Skeleton height={64} />
          <Skeleton height={64} />
        </Stack>
      ) : (
        <Stack spacing={1.2}>
          {patients.map((patient) => (
            <Box key={patient.id} sx={{ p: 1.4, borderRadius: 3.5, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.07), border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: 900 }}>{patient.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {patient.ward}
                  </Typography>
                </Box>
                <StatusChip value={patient.risk > 80 ? "Critical" : patient.risk > 50 ? "Observation" : "Stable"} />
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 1.2, flexWrap: "wrap" }} useFlexGap>
                <MiniVital label="HR" value={patient.heartRate} suffix="bpm" tone="rose" />
                <MiniVital label="SPO2" value={patient.spo2} suffix="%" tone="cyan" />
                <MiniVital label="RR" value={patient.respiratory} suffix="rpm" tone="emerald" />
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </GlassSurface>
  );
}

function MiniVital({ label, value, suffix, tone }: { label: string; value: number; suffix: string; tone: Tone }) {
  const [from] = toneMap[tone];
  return (
    <Box sx={{ minWidth: 82 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
      <Typography sx={{ color: from, fontWeight: 950 }}>
        {value} <Typography component="span" variant="caption">{suffix}</Typography>
      </Typography>
    </Box>
  );
}

function AiInsightsPanel() {
  const insights = ["Cardiac risk model requests ECG validation for p-101.", "Bed utilization is forecast to peak at 84 percent by 16:00.", "Two appointments can be moved to telehealth without clinical risk."];
  return (
    <GlassSurface sx={{ p: 2.5 }}>
      <SectionHeading icon={AutoAwesomeRounded} title="AI insights" subtitle="Explainable recommendations" />
      <Stack spacing={1.4}>
        {insights.map((insight, index) => (
          <Stack key={insight} direction="row" spacing={1.2} sx={{ alignItems: "flex-start" }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(chartPalette[index], 0.16), color: chartPalette[index], fontSize: 13, fontWeight: 900 }}>{index + 1}</Avatar>
            <Typography variant="body2" color="text.secondary">
              {insight}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </GlassSurface>
  );
}

function AppointmentQueue({ appointments }: { appointments: Appointment[] }) {
  return (
    <GlassSurface sx={{ p: 2.5 }}>
      <SectionHeading icon={AccessTimeRounded} title="Smart queue" subtitle="Next clinical actions" />
      <Stack spacing={1.25}>
        {appointments.slice(0, 4).map((appointment) => (
          <Stack key={appointment.id} direction="row" spacing={1.2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: 850 }}>{appointment.patient}</Typography>
              <Typography variant="caption" color="text.secondary">
                {appointment.type} at {appointment.time}
              </Typography>
            </Box>
            <StatusChip value={appointment.priority} />
          </Stack>
        ))}
      </Stack>
    </GlassSurface>
  );
}

function InventorySignals({ medicines }: { medicines: Medicine[] }) {
  return (
    <GlassSurface sx={{ p: 2.5 }}>
      <SectionHeading icon={WarningAmberRounded} title="Inventory risk" subtitle="AI demand forecast" />
      <Stack spacing={1.35}>
        {medicines.slice(0, 4).map((medicine) => (
          <Box key={medicine.id}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 850 }}>{medicine.name}</Typography>
              <StatusChip value={medicine.status} />
            </Stack>
            <LinearProgress variant="determinate" value={Math.min(100, (medicine.stock / Math.max(medicine.threshold, 1)) * 70)} sx={{ mt: 1, height: 8, borderRadius: 99 }} />
          </Box>
        ))}
      </Stack>
    </GlassSurface>
  );
}

function PatientsPage() {
  const navigate = useNavigate();
  const patientsQuery = usePatients();
  const columnHelper = createColumnHelper<Patient>();
  const columns = useMemo<ColumnDef<Patient, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: "Patient",
        cell: (info) => (
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "primary.main", fontWeight: 900 }}>{info.getValue().slice(0, 1)}</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 900 }}>{info.getValue()}</Typography>
              <Typography variant="caption" color="text.secondary">
                {info.row.original.id} | {info.row.original.gender}, {info.row.original.age}
              </Typography>
            </Box>
          </Stack>
        ),
      }),
      columnHelper.accessor("condition", { header: "Condition" }),
      columnHelper.accessor("ward", { header: "Ward" }),
      columnHelper.accessor("doctor", { header: "Doctor" }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => <StatusChip value={info.getValue()} /> }),
      columnHelper.accessor("risk", {
        header: "AI Risk",
        cell: (info) => (
          <Stack direction="row" spacing={1} sx={{ minWidth: 120, alignItems: "center" }}>
            <LinearProgress variant="determinate" value={info.getValue()} sx={{ flex: 1, height: 8, borderRadius: 99 }} />
            <Typography variant="body2" sx={{ fontWeight: 900 }}>
              {info.getValue()}%
            </Typography>
          </Stack>
        ),
      }),
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <IconButton aria-label={`View ${row.original.name}`} onClick={(event) => { event.stopPropagation(); navigate(`/patients/${row.original.id}`); }}>
              <VisibilityRounded fontSize="small" />
            </IconButton>
            <IconButton aria-label={`Edit ${row.original.name}`} onClick={(event) => { event.stopPropagation(); navigate(`/patients/${row.original.id}/edit`); }}>
              <EditRounded fontSize="small" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [columnHelper, navigate],
  );

  return (
    <PageFrame>
      <PageHeader
        kicker="Patient command"
        title="Searchable patient registry"
        description="A TanStack-powered clinical data grid with AI acuity, care teams, chart access, edit flows, and change tracking."
        actions={
          <Button variant="contained" startIcon={<PersonAddAltRounded />} component={RouterLink} to="/patients/new">
            Add patient
          </Button>
        }
      />
      {patientsQuery.isLoading ? <LoadingGrid count={3} /> : <DataTable data={patientsQuery.data ?? []} columns={columns} searchPlaceholder="Search by name, ward, doctor, condition" onRowClick={(patient) => navigate(`/patients/${patient.id}`)} />}
    </PageFrame>
  );
}

function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patientsSeed.find((item) => item.id === id);

  if (!patient) {
    return <NotFoundPage />;
  }

  return (
    <PageFrame>
      <PageHeader
        kicker="Patient details"
        title={patient.name}
        description={patient.aiSummary}
        actions={
          <>
            <Button variant="outlined" startIcon={<TimelineRounded />} onClick={() => navigate(`/patients/${patient.id}/changes`)}>
              See changes
            </Button>
            <Button variant="contained" startIcon={<EditRounded />} onClick={() => navigate(`/patients/${patient.id}/edit`)}>
              Edit patient
            </Button>
          </>
        }
      />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.85fr 1.15fr" }, gap: 2 }}>
        <Stack spacing={2}>
          <GlassSurface sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar sx={{ width: 76, height: 76, fontSize: 28, bgcolor: "primary.main", fontWeight: 950 }}>{patient.name.slice(0, 1)}</Avatar>
              <Box>
                <StatusChip value={patient.status} />
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {patient.condition}
                </Typography>
                <Typography color="text.secondary">
                  {patient.gender}, {patient.age} | {patient.ward}
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.5 }}>
              <InfoLine label="Doctor" value={patient.doctor} />
              <InfoLine label="Nurse" value={patient.nurse} />
              <InfoLine label="Phone" value={patient.phone} />
              <InfoLine label="Insurance" value={patient.insurance} />
              <InfoLine label="Email" value={patient.email} />
              <InfoLine label="Allergies" value={patient.allergies} />
            </Box>
          </GlassSurface>
          <GlassSurface sx={{ p: 2.5 }}>
            <SectionHeading icon={AssignmentRounded} title="Care team" />
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
              {patient.careTeam.map((team) => (
                <Chip key={team} label={team} color="primary" variant="outlined" />
              ))}
            </Stack>
          </GlassSurface>
        </Stack>

        <Stack spacing={2}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
            <MetricCard label="Heart rate" value={`${patient.vitals.heartRate}`} detail="beats per minute" icon={FavoriteRounded} tone="rose" progress={patient.vitals.heartRate / 1.4} />
            <MetricCard label="Oxygen" value={`${patient.vitals.spo2}%`} detail="SPO2 saturation" icon={MonitorHeartRounded} tone="cyan" progress={patient.vitals.spo2} />
            <MetricCard label="Blood pressure" value={patient.vitals.bp} detail="last reading" icon={HealthAndSafetyRounded} tone="emerald" progress={patient.acuity} />
            <MetricCard label="AI risk" value={`${patient.risk}%`} detail="predictive acuity" icon={AutoAwesomeRounded} tone="violet" progress={patient.risk} />
          </Box>
          <GlassSurface sx={{ p: 2.5 }}>
            <SectionHeading icon={InsightsRounded} title="Diagnostics trend" subtitle="Risk score and oxygen saturation" />
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patient.diagnostics} margin={{ left: -18, right: 20, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                  <XAxis dataKey="label" stroke="currentColor" tickLine={false} axisLine={false} />
                  <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                  <ChartTooltipPrimitive content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="value" name="AI risk" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="secondary" name="Oxygen" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </GlassSurface>
          <ActivityList items={patient.timeline.map((item, index) => ({ id: `${patient.id}-${index}`, actor: patient.name, action: item, scope: patient.ward, time: `Step ${index + 1}` }))} title="Clinical timeline" />
        </Stack>
      </Box>
    </PageFrame>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
      <Typography sx={{ wordBreak: "break-word", fontWeight: 850 }}>
        {value}
      </Typography>
    </Box>
  );
}

function PatientChangesPage() {
  const { id } = useParams();
  const patient = patientsSeed.find((item) => item.id === id);
  if (!patient) {
    return <NotFoundPage />;
  }
  return (
    <PageFrame>
      <PageHeader kicker="Change log" title={`Changes for ${patient.name}`} description="Every chart update, AI recommendation, and operational change is captured for audit-ready healthcare governance." />
      <ActivityList items={patient.changes.map((change, index) => ({ id: `${patient.id}-change-${index}`, actor: "HeliosAI audit", action: change, scope: patient.name, time: `Update ${index + 1}` }))} title="Tracked updates" />
    </PageFrame>
  );
}

type PatientFormValues = {
  name: string;
  age: string;
  gender: string;
  ward: string;
  condition: string;
  doctor: string;
  phone: string;
  email: string;
  allergies: string;
  status: string;
};

function getPatientDefaults(patient?: Patient): PatientFormValues {
  return {
    name: patient?.name ?? "",
    age: patient ? String(patient.age) : "",
    gender: patient?.gender ?? "",
    ward: patient?.ward ?? "",
    condition: patient?.condition ?? "",
    doctor: patient?.doctor ?? "",
    phone: patient?.phone ?? "",
    email: patient?.email ?? "",
    allergies: patient?.allergies ?? "",
    status: patient?.status ?? "Stable",
  };
}

function PatientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = patientsSeed.find((patient) => patient.id === id);
  const isEdit = Boolean(existing);
  const form = useForm({
    defaultValues: getPatientDefaults(existing),
    onSubmit: async ({ value }) => {
      await mockRequest(value, 520);
      navigate(isEdit && existing ? `/patients/${existing.id}` : "/patients");
    },
  });

  return (
    <PageFrame>
      <PageHeader
        kicker={isEdit ? "Edit patient" : "New patient"}
        title={isEdit && existing ? `Edit ${existing.name}` : "Create patient record"}
        description="Modern TanStack Form workflow for clean validation-ready patient intake, triage, and administrative updates."
      />
      <GlassSurface sx={{ p: { xs: 2, md: 3 } }}>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
            <form.Field name="name">
              {(field) => <TextField fullWidth required label="Full name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="age">
              {(field) => <TextField fullWidth required label="Age" type="number" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="gender">
              {(field) => (
                <TextField fullWidth required select label="Gender" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur}>
                  {["Female", "Male", "Non-binary", "Prefer not to say"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </form.Field>
            <form.Field name="status">
              {(field) => (
                <TextField fullWidth select label="Status" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur}>
                  {["Stable", "Observation", "Recovery", "Critical"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </form.Field>
            <form.Field name="ward">
              {(field) => <TextField fullWidth required label="Ward or room" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="doctor">
              {(field) => <TextField fullWidth required label="Assigned doctor" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="phone">
              {(field) => <TextField fullWidth label="Phone" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="email">
              {(field) => <TextField fullWidth label="Email" type="email" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} />}
            </form.Field>
            <form.Field name="condition">
              {(field) => <TextField fullWidth required label="Condition" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} sx={{ gridColumn: { md: "1 / -1" } }} />}
            </form.Field>
            <form.Field name="allergies">
              {(field) => <TextField fullWidth multiline minRows={3} label="Allergies and notes" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} sx={{ gridColumn: { md: "1 / -1" } }} />}
            </form.Field>
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ mt: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" variant="contained" disabled={!canSubmit || isSubmitting} startIcon={<CheckCircleRounded />}>
                  {isSubmitting ? "Saving" : isEdit ? "Save changes" : "Create patient"}
                </Button>
              )}
            </form.Subscribe>
          </Stack>
        </Box>
      </GlassSurface>
    </PageFrame>
  );
}

function AppointmentsPage() {
  const appointmentsQuery = useAppointments();
  const columnHelper = createColumnHelper<Appointment>();
  const columns = useMemo<ColumnDef<Appointment, any>[]>(
    () => [
      columnHelper.accessor("time", { header: "Time" }),
      columnHelper.accessor("patient", { header: "Patient" }),
      columnHelper.accessor("type", { header: "Type" }),
      columnHelper.accessor("clinician", { header: "Clinician" }),
      columnHelper.accessor("room", { header: "Room" }),
      columnHelper.accessor("priority", { header: "Priority", cell: (info) => <StatusChip value={info.getValue()} /> }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => <StatusChip value={info.getValue()} /> }),
    ],
    [columnHelper],
  );

  return (
    <PageFrame>
      <PageHeader kicker="Scheduling" title="Appointment analytics" description="AI-assisted scheduling blends appointment queues, wait-time prediction, and clinical priority routing." actions={<Button variant="contained" startIcon={<AddRounded />}>New appointment</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" }, gap: 2, mb: 2 }}>
        <GlassSurface sx={{ p: 2.5, minHeight: 330 }}>
          <SectionHeading icon={EventAvailableRounded} title="Appointment mix" />
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={appointmentMix} dataKey="value" nameKey="name" innerRadius={62} outerRadius={94} paddingAngle={4}>
                  {appointmentMix.map((entry, index) => (
                    <Cell key={entry.name} fill={chartPalette[index]} />
                  ))}
                </Pie>
                <ChartTooltipPrimitive content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>
        <GlassSurface sx={{ p: 2.5, minHeight: 330 }}>
          <SectionHeading icon={AnalyticsRounded} title="Wait-time intelligence" subtitle="Predicted wait in minutes by appointment" />
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentsQuery.data ?? []} margin={{ left: -18, right: 18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                <XAxis dataKey="patient" stroke="currentColor" tickLine={false} axisLine={false} hide />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                <ChartTooltipPrimitive content={<ChartTooltip />} />
                <Bar dataKey="waitMins" name="Wait" radius={[12, 12, 0, 0]} fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>
      </Box>
      {appointmentsQuery.isLoading ? <LoadingGrid count={2} /> : <DataTable data={appointmentsQuery.data ?? []} columns={columns} searchPlaceholder="Search appointments, clinicians, rooms" />}
    </PageFrame>
  );
}

function CalendarPage() {
  const appointments = appointmentsSeed;
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <PageFrame>
      <PageHeader kicker="Calendar" title="AI calendar scheduling" description="A responsive scheduling grid for clinics, care teams, rooms, and dynamic appointment optimization." actions={<Button variant="contained" startIcon={<CalendarMonthRounded />}>Optimize week</Button>} />
      <GlassSurface sx={{ p: { xs: 1.5, md: 2.5 }, overflowX: "auto" }}>
        <Box sx={{ minWidth: 820, display: "grid", gridTemplateColumns: "92px repeat(5, minmax(130px, 1fr))", gap: 1 }}>
          <Box />
          {days.map((day) => (
            <Typography key={day} sx={{ py: 1, fontWeight: 900, textAlign: "center" }}>
              {day}
            </Typography>
          ))}
          {hours.map((hour) => [
            <Typography key={`${hour}-label`} color="text.secondary" sx={{ py: 1.3, fontWeight: 850 }}>
              {hour}
            </Typography>,
            ...days.map((day) => {
              const booking = appointments.find((appointment) => appointment.date === day && appointment.time.startsWith(hour.slice(0, 2)));
              return (
                <Box key={`${day}-${hour}`} sx={{ minHeight: 84, p: 1, borderRadius: 3, border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`, bgcolor: booking ? alpha("#06b6d4", 0.12) : "transparent" }}>
                  {booking ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>
                        {booking.patient}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.type}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Open slot
                    </Typography>
                  )}
                </Box>
              );
            }),
          ])}
        </Box>
      </GlassSurface>
    </PageFrame>
  );
}

function StaffPage({ filterRole, title, description }: { filterRole?: StaffMember["role"]; title: string; description: string }) {
  const staffQuery = useStaff();
  const staff = (staffQuery.data ?? []).filter((member) => (filterRole ? member.role === filterRole : true));
  return (
    <PageFrame>
      <PageHeader kicker="Workforce" title={title} description={description} actions={<Button variant="contained" startIcon={<AddRounded />}>Invite staff</Button>} />
      {staffQuery.isLoading ? <LoadingGrid count={3} /> : <StaffGrid staff={staff} />}
    </PageFrame>
  );
}

function StaffGrid({ staff }: { staff: StaffMember[] }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
      {staff.map((member) => (
        <GlassSurface key={member.id} interactive sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "secondary.main", fontWeight: 900 }}>{member.name.slice(0, 1)}</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 900 }}>{member.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.role} | {member.department}
                </Typography>
              </Box>
            </Stack>
            <StatusChip value={member.status} />
          </Stack>
          <Stack direction="row" sx={{ mt: 2, justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Workload
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 900 }}>
              {member.load}%
            </Typography>
          </Stack>
          <LinearProgress variant="determinate" value={member.load} sx={{ mt: 1, height: 8, borderRadius: 99 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            Next available: {member.nextSlot}
          </Typography>
        </GlassSurface>
      ))}
    </Box>
  );
}

function PharmacyPage() {
  const navigate = useNavigate();
  const medicinesQuery = useMedicines();
  const columnHelper = createColumnHelper<Medicine>();
  const columns = useMemo<ColumnDef<Medicine, any>[]>(
    () => [
      columnHelper.accessor("name", { header: "Medicine" }),
      columnHelper.accessor("category", { header: "Category" }),
      columnHelper.accessor("stock", { header: "Stock" }),
      columnHelper.accessor("threshold", { header: "Threshold" }),
      columnHelper.accessor("demand", { header: "Demand", cell: (info) => <LinearProgress variant="determinate" value={info.getValue()} sx={{ minWidth: 110, height: 8, borderRadius: 99 }} /> }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => <StatusChip value={info.getValue()} /> }),
      { id: "actions", header: "Actions", enableSorting: false, cell: ({ row }) => <Button size="small" onClick={() => navigate(`/pharmacy/medicines/${row.original.id}`)}>Details</Button> },
    ],
    [columnHelper, navigate],
  );
  const low = (medicinesQuery.data ?? []).filter((medicine) => medicine.status !== "Optimal").length;
  return (
    <PageFrame>
      <PageHeader kicker="Pharmacy" title="Medicine inventory dashboard" description="Forecast medicine demand, monitor expiry risk, prevent stockouts, and review supplier health with smart dashboards." actions={<Button variant="contained" startIcon={<LocalPharmacyRounded />}>Create order</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2, mb: 2 }}>
        <MetricCard label="Inventory value" value="$4.8M" detail="Across central pharmacy" icon={ReceiptLongRounded} tone="emerald" progress={74} />
        <MetricCard label="Low stock" value={`${low}`} detail="AI reorder suggested" icon={WarningAmberRounded} tone="amber" progress={42} />
        <MetricCard label="Medication safety" value="99.2%" detail="Interaction checks passed" icon={ShieldRounded} tone="cyan" progress={99} />
      </Box>
      {medicinesQuery.isLoading ? <LoadingGrid count={3} /> : <DataTable data={medicinesQuery.data ?? []} columns={columns} searchPlaceholder="Search medicines, suppliers, categories" />}
    </PageFrame>
  );
}

function MedicineDetailsPage() {
  const { id } = useParams();
  const medicine = medicineSeed.find((item) => item.id === id);
  if (!medicine) {
    return <NotFoundPage />;
  }
  const stockData = [
    { label: "Now", value: medicine.stock },
    { label: "24h", value: Math.max(0, medicine.stock - 9) },
    { label: "48h", value: Math.max(0, medicine.stock - 18) },
    { label: "72h", value: Math.max(0, medicine.stock - 28) },
  ];
  return (
    <PageFrame>
      <PageHeader kicker="Medicine details" title={medicine.name} description={`${medicine.category} supplied by ${medicine.supplier}. AI demand pressure is ${medicine.demand} percent.`} actions={<Button variant="contained" startIcon={<AddRounded />}>Reorder</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" }, gap: 2 }}>
        <GlassSurface sx={{ p: 2.5 }}>
          <StatusChip value={medicine.status} />
          <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 2 }}>
            <InfoLine label="Stock" value={`${medicine.stock} units`} />
            <InfoLine label="Threshold" value={`${medicine.threshold} units`} />
            <InfoLine label="Expiry" value={medicine.expiry} />
            <InfoLine label="Supplier" value={medicine.supplier} />
          </Box>
        </GlassSurface>
        <GlassSurface sx={{ p: 2.5 }}>
          <SectionHeading icon={TrendingUpRounded} title="Demand forecast" />
          <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockData} margin={{ left: -18, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                <XAxis dataKey="label" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                <ChartTooltipPrimitive content={<ChartTooltip />} />
                <Area type="monotone" dataKey="value" name="Projected stock" stroke="#10b981" fill="#10b98133" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>
      </Box>
    </PageFrame>
  );
}

function LabsPage() {
  const navigate = useNavigate();
  const labsQuery = useLabs();
  const columnHelper = createColumnHelper<LabReport>();
  const columns = useMemo<ColumnDef<LabReport, any>[]>(
    () => [
      columnHelper.accessor("patient", { header: "Patient" }),
      columnHelper.accessor("test", { header: "Test" }),
      columnHelper.accessor("collectedAt", { header: "Collected" }),
      columnHelper.accessor("result", { header: "Result" }),
      columnHelper.accessor("anomaly", { header: "Anomaly", cell: (info) => <LinearProgress variant="determinate" value={info.getValue()} sx={{ minWidth: 120, height: 8, borderRadius: 99 }} /> }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => <StatusChip value={info.getValue()} /> }),
      { id: "actions", header: "Actions", enableSorting: false, cell: ({ row }) => <Button size="small" onClick={() => navigate(`/labs/reports/${row.original.id}`)}>View report</Button> },
    ],
    [columnHelper, navigate],
  );
  return (
    <PageFrame>
      <PageHeader kicker="Laboratory" title="Lab report visualization" description="AI anomaly scoring, verification queues, charted biomarkers, and rapid clinical report access for diagnostics teams." actions={<Button variant="contained" startIcon={<ScienceRounded />}>Verify next</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2, mb: 2 }}>
        <MetricCard label="Reports today" value="248" detail="31 awaiting verification" icon={BiotechRounded} tone="violet" progress={82} />
        <MetricCard label="AI anomalies" value="12" detail="4 critical clinical flags" icon={AutoAwesomeRounded} tone="rose" progress={58} />
        <MetricCard label="Turnaround" value="38m" detail="median processing time" icon={AccessTimeRounded} tone="cyan" progress={73} />
      </Box>
      {labsQuery.isLoading ? <LoadingGrid count={3} /> : <DataTable data={labsQuery.data ?? []} columns={columns} searchPlaceholder="Search lab reports, patients, tests" onRowClick={(report) => navigate(`/labs/reports/${report.id}`)} />}
    </PageFrame>
  );
}

function LabReportDetailsPage() {
  const { id } = useParams();
  const report = labReportsSeed.find((item) => item.id === id);
  if (!report) {
    return <NotFoundPage />;
  }
  return (
    <PageFrame>
      <PageHeader kicker="Report details" title={`${report.test} for ${report.patient}`} description={report.aiFinding} actions={<Button variant="contained" startIcon={<DownloadRounded />}>Download report</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.78fr 1.22fr" }, gap: 2 }}>
        <GlassSurface sx={{ p: 2.5 }}>
          <StatusChip value={report.status} />
          <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 2 }}>
            <InfoLine label="Patient ID" value={report.patientId} />
            <InfoLine label="Collected" value={report.collectedAt} />
            <InfoLine label="Result" value={report.result} />
            <InfoLine label="Anomaly" value={`${report.anomaly}%`} />
          </Box>
        </GlassSurface>
        <GlassSurface sx={{ p: 2.5 }}>
          <SectionHeading icon={BiotechRounded} title="Biomarker visualization" />
          <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.chartData} margin={{ left: -18, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                <XAxis dataKey="label" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                <ChartTooltipPrimitive content={<ChartTooltip />} />
                <Bar dataKey="value" name="Marker" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>
      </Box>
    </PageFrame>
  );
}

function LiveMonitoringPage() {
  const liveQuery = useLivePatients();
  const patients = liveQuery.data ?? [];
  return (
    <PageFrame>
      <PageHeader kicker="Vitals" title="Live monitoring center" description="Continuously refreshed patient telemetry with motion cues, clinical escalation signals, and risk-aware observations." actions={<LivePulse label="Auto refresh" />} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
        {patients.map((patient) => (
          <GlassSurface key={patient.id} interactive sx={{ p: 2.5 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography sx={{ fontWeight: 950 }}>{patient.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {patient.ward}
                </Typography>
              </Box>
              <LivePulse label="Live" />
            </Stack>
            <Box sx={{ height: 160, mt: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="58%" outerRadius="100%" data={[{ name: "risk", value: patient.risk, fill: patient.risk > 80 ? "#ef4444" : "#06b6d4" }]} startAngle={180} endAngle={-180}>
                  <RadialBar dataKey="value" cornerRadius={12} background />
                </RadialBarChart>
              </ResponsiveContainer>
            </Box>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <MiniVital label="HR" value={patient.heartRate} suffix="bpm" tone="rose" />
              <MiniVital label="SPO2" value={patient.spo2} suffix="%" tone="cyan" />
              <MiniVital label="Risk" value={patient.risk} suffix="%" tone="violet" />
            </Stack>
          </GlassSurface>
        ))}
      </Box>
    </PageFrame>
  );
}

function AnalyticsPage() {
  return (
    <PageFrame>
      <PageHeader kicker="Enterprise analytics" title="AI-driven hospital intelligence" description="Operational, clinical, and financial signals presented as a clean executive analytics suite." actions={<Button variant="contained" startIcon={<InsightsRounded />}>Generate report</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" }, gap: 2 }}>
        <GlassSurface sx={{ p: 2.5, minHeight: 380 }}>
          <SectionHeading icon={AnalyticsRounded} title="Department load forecast" />
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentLoad} margin={{ left: -18, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
                <XAxis dataKey="name" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} />
                <ChartTooltipPrimitive content={<ChartTooltip />} />
                <Bar dataKey="load" fill="#06b6d4" radius={[12, 12, 0, 0]} />
                <Bar dataKey="forecast" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </GlassSurface>
        <GlassSurface sx={{ p: 2.5 }}>
          <SectionHeading icon={AutoAwesomeRounded} title="AI model health" />
          {[
            { label: "Clinical risk", value: 94 },
            { label: "Scheduling", value: 89 },
            { label: "Inventory demand", value: 91 },
            { label: "Lab anomaly", value: 87 },
          ].map((item) => (
            <Box key={item.label} sx={{ mb: 2 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 850 }}>{item.label}</Typography>
                <Typography sx={{ fontWeight: 950 }}>{item.value}%</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={item.value} sx={{ mt: 1, height: 9, borderRadius: 99 }} />
            </Box>
          ))}
        </GlassSurface>
      </Box>
    </PageFrame>
  );
}

function NotificationCenterPage() {
  const notificationsQuery = useNotifications();
  const [tab, setTab] = useState("All");
  const notifications = (notificationsQuery.data ?? []).filter((item) => tab === "All" || item.type === tab);
  const tabs = ["All", "AI", "Clinical", "Inventory", "System"];
  return (
    <PageFrame>
      <PageHeader kicker="Notifications" title="Smart notification center" description="Prioritized alerts with severity, workflow context, and real-time refresh for every role." actions={<LivePulse label="Synced" />} />
      <GlassSurface sx={{ p: 2.5 }}>
        <Tabs value={tab} onChange={(_event, value) => setTab(value)} variant="scrollable" allowScrollButtonsMobile sx={{ mb: 2 }}>
          {tabs.map((item) => (
            <Tab key={item} label={item} value={item} />
          ))}
        </Tabs>
        <Stack spacing={1.4}>
          {notifications.map((item) => (
            <Alert key={item.id} severity={item.severity} variant="outlined" sx={{ borderRadius: 4, bgcolor: (theme) => alpha(theme.palette.background.paper, 0.46) }}>
              <Typography sx={{ fontWeight: 900 }}>{item.title}</Typography>
              <Typography variant="body2">{item.detail}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.type} | {item.time}
              </Typography>
            </Alert>
          ))}
        </Stack>
      </GlassSurface>
    </PageFrame>
  );
}

function ActivityPage() {
  const activitiesQuery = useActivities();
  return (
    <PageFrame>
      <PageHeader kicker="Audit trail" title="Activity timeline" description="A transparent operational timeline for chart edits, AI approvals, inventory events, access changes, and care team handoffs." />
      {activitiesQuery.isLoading ? <LoadingGrid count={2} /> : <ActivityList items={activitiesQuery.data ?? []} title="Enterprise activity" />}
    </PageFrame>
  );
}

function ActivityList({ items, title }: { items: ActivityItem[]; title: string }) {
  return (
    <GlassSurface sx={{ p: 2.5 }}>
      <SectionHeading icon={TimelineRounded} title={title} />
      <Stack spacing={0}>
        {items.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} sx={{ position: "relative", pb: index === items.length - 1 ? 0 : 2.2 }}>
            <Box sx={{ width: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: "primary.main", boxShadow: (theme) => `0 0 0 6px ${alpha(theme.palette.primary.main, 0.14)}` }} />
              {index !== items.length - 1 ? <Box sx={{ width: 2, flex: 1, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.18), mt: 1 }} /> : null}
            </Box>
            <Box sx={{ flex: 1, pb: 1 }}>
              <Typography sx={{ fontWeight: 900 }}>{item.actor}</Typography>
              <Typography color="text.secondary">
                {item.action} | {item.scope}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.time}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </GlassSurface>
  );
}

function IntakeFormPage() {
  const form = useForm({
    defaultValues: { name: "", visitReason: "", consent: false, pain: 3, notes: "" },
    onSubmit: async ({ value }) => {
      await mockRequest(value, 480);
    },
  });
  return (
    <PageFrame>
      <PageHeader kicker="Forms" title="Digital intake form" description="Accessible, mobile-first TanStack Form experience for patients and front-office users." />
      <GlassSurface sx={{ p: { xs: 2, md: 3 } }}>
        <Box component="form" onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
          <Stack spacing={2}>
            <form.Field name="name">
              {(field) => <TextField fullWidth label="Patient name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="visitReason">
              {(field) => <TextField fullWidth label="Reason for visit" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="pain">
              {(field) => (
                <Box>
                  <Typography sx={{ fontWeight: 850 }}>Pain level: {field.state.value}</Typography>
                  <Slider value={field.state.value} min={0} max={10} onChange={(_event, value) => field.handleChange(Array.isArray(value) ? value[0] : value)} aria-label="Pain level" />
                </Box>
              )}
            </form.Field>
            <form.Field name="notes">
              {(field) => <TextField fullWidth multiline minRows={4} label="Notes" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="consent">
              {(field) => <FormControlLabel control={<Switch checked={field.state.value} onChange={(event) => field.handleChange(event.target.checked)} />} label="I consent to digital intake processing" />}
            </form.Field>
            <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
              {([isSubmitting]) => (
                <Button type="submit" variant="contained" startIcon={<CheckCircleRounded />} disabled={isSubmitting} sx={{ alignSelf: "flex-start" }}>
                  {isSubmitting ? "Submitting" : "Submit intake"}
                </Button>
              )}
            </form.Subscribe>
          </Stack>
        </Box>
      </GlassSurface>
    </PageFrame>
  );
}

function BillingPage() {
  const invoices = [
    { label: "Claims ready", value: "$842K", detail: "AI coding confidence 93%", icon: ReceiptLongRounded, tone: "emerald" as Tone },
    { label: "Denied risk", value: "$41K", detail: "12 claims require review", icon: WarningAmberRounded, tone: "amber" as Tone },
    { label: "Patient balance", value: "$126K", detail: "Payment plans active", icon: PeopleAltRounded, tone: "cyan" as Tone },
  ];
  return (
    <PageFrame>
      <PageHeader kicker="Revenue cycle" title="Billing and claims intelligence" description="Financial dashboards for claims readiness, patient billing, payer risk, and operational revenue transparency." />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
        {invoices.map((item) => (
          <MetricCard key={item.label} {...item} progress={72} />
        ))}
      </Box>
    </PageFrame>
  );
}

function AccessControlPage() {
  const modules = ["System", "Users", "Clinical", "Pharmacy", "Laboratory", "Billing", "AI Models", "Audit"];
  return (
    <PageFrame>
      <PageHeader kicker="Security" title="Role-based access control" description="Enterprise permission matrix for Super Admin, Admin, Doctor, Nurse, Pharmacist, Lab Technician, Patient, and User experiences." actions={<Button variant="contained" startIcon={<ShieldRounded />}>Save policy</Button>} />
      <GlassSurface sx={{ p: 2.5, overflowX: "auto" }}>
        <Box sx={{ minWidth: 920, display: "grid", gridTemplateColumns: "170px repeat(8, minmax(92px, 1fr))", gap: 1 }}>
          <Typography sx={{ fontWeight: 950 }}>Role</Typography>
          {modules.map((module) => (
            <Typography key={module} variant="body2" sx={{ textAlign: "center", fontWeight: 900 }}>
              {module}
            </Typography>
          ))}
          {roles.map((role) => [
            <Typography key={`${role}-label`} sx={{ py: 1, fontWeight: 950 }}>
              {role}
            </Typography>,
            ...modules.map((module) => {
              const enabled = rolePermissions[role].includes(module);
              return (
                <Box key={`${role}-${module}`} sx={{ display: "grid", placeItems: "center", minHeight: 48, borderRadius: 3, bgcolor: (theme) => alpha(enabled ? theme.palette.success.main : theme.palette.text.primary, enabled ? 0.12 : 0.05) }}>
                  {enabled ? <CheckCircleRounded color="success" /> : <CloseRounded color="disabled" />}
                </Box>
              );
            }),
          ])}
        </Box>
      </GlassSurface>
    </PageFrame>
  );
}

function ProfilePage() {
  const { role } = useAppState();
  const accent = roleAccent[role];
  return (
    <PageFrame>
      <PageHeader kicker="Profile" title="Your hospital identity" description="Manage professional profile, active role, permissions, AI preferences, and recent changes." actions={<Button variant="contained" startIcon={<EditRounded />} component={RouterLink} to="/profile/edit">Edit profile</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" }, gap: 2 }}>
        <GlassSurface sx={{ p: 3 }}>
          <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center" }}>
            <Avatar sx={{ width: 96, height: 96, background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, fontSize: 38, fontWeight: 950 }}>{role.slice(0, 1)}</Avatar>
            <Typography variant="h5">Alex Morgan</Typography>
            <Chip label={role} color="primary" />
            <Typography color="text.secondary">{roleWorkspace[role].summary}</Typography>
          </Stack>
        </GlassSurface>
        <ActivityList items={activitiesSeed.slice(0, 4)} title="Recent profile activity" />
      </Box>
    </PageFrame>
  );
}

function ProfileEditPage() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { name: "Alex Morgan", email: "alex.morgan@heliosai.health", phone: "+1 415 555 0120", specialty: "Clinical operations", bio: "Enterprise healthcare leader focused on AI-assisted care quality." },
    onSubmit: async ({ value }) => {
      await mockRequest(value, 420);
      navigate("/profile");
    },
  });
  return (
    <PageFrame>
      <PageHeader kicker="Profile edit" title="Edit profile" description="Update the profile details that appear across audit trails, care teams, and role-based dashboards." />
      <GlassSurface sx={{ p: 3 }}>
        <Box component="form" onSubmit={(event) => { event.preventDefault(); form.handleSubmit(); }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
            <form.Field name="name">
              {(field) => <TextField fullWidth label="Name" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="email">
              {(field) => <TextField fullWidth label="Email" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="phone">
              {(field) => <TextField fullWidth label="Phone" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="specialty">
              {(field) => <TextField fullWidth label="Specialty" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />}
            </form.Field>
            <form.Field name="bio">
              {(field) => <TextField fullWidth multiline minRows={4} label="Bio" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} sx={{ gridColumn: { md: "1 / -1" } }} />}
            </form.Field>
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ mt: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => navigate("/profile")}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={<CheckCircleRounded />}>Save profile</Button>
          </Stack>
        </Box>
      </GlassSurface>
    </PageFrame>
  );
}

function SettingsPage() {
  return (
    <PageFrame>
      <PageHeader kicker="Settings" title="System preferences" description="Configure real-time updates, AI explainability, visual density, notification preferences, and accessibility options." actions={<Button variant="contained" startIcon={<TuneRounded />}>Apply settings</Button>} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        {[
          ["Realtime monitoring", "Refresh live widgets and alerts automatically."],
          ["AI explainability", "Show confidence, evidence, and recommended next steps."],
          ["Reduced motion", "Minimize decorative motion while keeping usability cues."],
          ["Accessible contrast", "Increase contrast in clinical status surfaces."],
        ].map(([title, detail], index) => (
          <GlassSurface key={title} sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: 950 }}>{title}</Typography>
                <Typography color="text.secondary">{detail}</Typography>
              </Box>
              <Switch defaultChecked={index !== 2} slotProps={{ input: { "aria-label": title } }} />
            </Stack>
          </GlassSurface>
        ))}
      </Box>
    </PageFrame>
  );
}

function AssistantPage() {
  return (
    <PageFrame>
      <PageHeader kicker="AI assistant" title="Clinical operations copilot" description="Ask role-aware questions about patients, schedules, inventory, labs, billing, or hospital operations." />
      <GlassSurface sx={{ p: { xs: 2, md: 3 }, minHeight: 520 }}>
        <AssistantChat expanded />
      </GlassSurface>
    </PageFrame>
  );
}

function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ position: "fixed", right: { xs: 16, md: 24 }, bottom: { xs: 16, md: 24 }, zIndex: 1400 }}>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ duration: 0.22 }}>
            <GlassSurface sx={{ width: { xs: "calc(100vw - 32px)", sm: 390 }, p: 2, mb: 1.4 }}>
              <Stack direction="row" sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}>
                <SectionHeading icon={SmartToyRounded} title="HeliosAI" subtitle="Role-aware assistant" />
                <IconButton aria-label="Close assistant" onClick={() => setOpen(false)}>
                  <CloseRounded />
                </IconButton>
              </Stack>
              <AssistantChat />
            </GlassSurface>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Button variant="contained" size="large" startIcon={<SmartToyRounded />} onClick={() => setOpen((current) => !current)} sx={{ borderRadius: 99, px: 2.5, boxShadow: "0 18px 42px rgba(6,182,212,0.28)" }}>
        AI Assistant
      </Button>
    </Box>
  );
}

function AssistantChat({ expanded = false }: { expanded?: boolean }) {
  const { role } = useAppState();
  const [messages, setMessages] = useState<Array<{ from: "ai" | "user"; text: string }>>([
    { from: "ai", text: `Hello ${role}. I can summarize patients, forecast inventory, explain lab anomalies, or optimize schedules.` },
  ]);
  const [draft, setDraft] = useState("");
  const send = () => {
    const question = draft.trim();
    if (!question) {
      return;
    }
    setMessages((current) => [
      ...current,
      { from: "user", text: question },
      { from: "ai", text: `Based on your ${role} workspace, I would review cardiac risk, appointment queue pressure, and any access-limited tasks before acting.` },
    ]);
    setDraft("");
  };
  return (
    <Stack spacing={1.5} sx={{ height: expanded ? 470 : 360 }}>
      <Box sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
        <Stack spacing={1.2}>
          {messages.map((message, index) => (
            <Box key={`${message.from}-${index}`} sx={{ alignSelf: message.from === "user" ? "flex-end" : "flex-start", maxWidth: "86%", p: 1.35, borderRadius: 3, bgcolor: (theme) => (message.from === "user" ? alpha(theme.palette.primary.main, 0.18) : alpha(theme.palette.text.primary, 0.07)) }}>
              <Typography variant="body2">{message.text}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      <Stack direction="row" spacing={1}>
        <TextField fullWidth placeholder="Ask HeliosAI" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") send(); }} />
        <IconButton color="primary" aria-label="Send message" onClick={send}>
          <SendRounded />
        </IconButton>
      </Stack>
    </Stack>
  );
}

function NotFoundPage() {
  return (
    <PageFrame>
      <GlassSurface sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4">Page not found</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          The requested hospital workspace does not exist.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Return to dashboard
        </Button>
      </GlassSurface>
    </PageFrame>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "patients/new", element: <PatientFormPage /> },
      { path: "patients/:id", element: <PatientDetailsPage /> },
      { path: "patients/:id/edit", element: <PatientFormPage /> },
      { path: "patients/:id/changes", element: <PatientChangesPage /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "staff", element: <StaffPage title="Staff command center" description="Manage hospital workforce capacity, workload, status, and availability across departments." /> },
      { path: "doctors", element: <StaffPage filterRole="Doctor" title="Doctor directory" description="Clinical roster with availability, department assignments, and AI workload signals." /> },
      { path: "nursing", element: <StaffPage filterRole="Nurse" title="Nurse station" description="Nursing workload, rounds readiness, handoff visibility, and care coordination for each ward." /> },
      { path: "pharmacy", element: <PharmacyPage /> },
      { path: "pharmacy/medicines/:id", element: <MedicineDetailsPage /> },
      { path: "labs", element: <LabsPage /> },
      { path: "labs/reports/:id", element: <LabReportDetailsPage /> },
      { path: "monitoring", element: <LiveMonitoringPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "forms/intake", element: <IntakeFormPage /> },
      { path: "notifications", element: <NotificationCenterPage /> },
      { path: "activity", element: <ActivityPage /> },
      { path: "access-control", element: <AccessControlPage /> },
      { path: "assistant", element: <AssistantPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/edit", element: <ProfileEditPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </QueryClientProvider>
  );
}