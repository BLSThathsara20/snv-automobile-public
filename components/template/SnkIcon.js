import {
  BadgeCheck,
  Calculator,
  Calendar,
  Car,
  Check,
  ChevronDown,
  Clock,
  Headset,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const ICONS = {
  car: Car,
  wrench: Wrench,
  headset: Headset,
  check: Check,
  calculator: Calculator,
  calendar: Calendar,
  'badge-check': BadgeCheck,
  'shield-check': ShieldCheck,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock,
  'chevron-down': ChevronDown,
  menu: Menu,
};

export default function SnkIcon({ name, size = 24, className = '', strokeWidth = 1.75, ...props }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    />
  );
}
