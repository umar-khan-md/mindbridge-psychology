"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  ArrowRight,
  Video,
} from "lucide-react";
import { addDays, startOfWeek, format, isSameDay, isToday, isBefore } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Types
   -------------------------------------------------------------------------- */

interface TimeSlot {
  time: string; // "HH:mm"
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

interface AvailabilityCalendarProps {
  practitionerSlug?: string;
  practitionerName?: string;
  onSlotSelect?: (date: Date, time: string) => void;
}

/* --------------------------------------------------------------------------
   Demo Data Generator
   -------------------------------------------------------------------------- */

function generateDemoSlots(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();

  // No slots on Sunday (0) or Saturday (6)
  if (dayOfWeek === 0 || dayOfWeek === 6) return [];

  // Seed based on date for consistency
  const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const pseudoRandom = (n: number) => {
    const x = Math.sin(dateSeed * 9301 + n * 49297) * 49297;
    return x - Math.floor(x);
  };

  const startHour = 8;
  const endHour = 20;
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    // On-the-hour slots
    const availProbability = pseudoRandom(hour);
    slots.push({
      time: `${hour.toString().padStart(2, "0")}:00`,
      available: availProbability > 0.45,
    });

    // Half-hour slots — slightly lower probability
    if (hour < endHour - 1) {
      const halfAvail = pseudoRandom(hour + 100);
      slots.push({
        time: `${hour.toString().padStart(2, "0")}:30`,
        available: halfAvail > 0.55,
      });
    }
  }

  // If date is in the past or today before current time, mark past slots unavailable
  const now = new Date();
  if (isSameDay(date, now)) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    for (const slot of slots) {
      const [h, m] = slot.time.split(":").map(Number);
      if (h * 60 + m <= currentMinutes + 30) {
        slot.available = false;
      }
    }
  } else if (isBefore(date, now)) {
    for (const slot of slots) {
      slot.available = false;
    }
  }

  return slots;
}

function generateWeekSchedule(weekStart: Date): DaySchedule[] {
  const days: DaySchedule[] = [];
  for (let i = 0; i < 6; i++) {
    // Mon-Sat
    const date = addDays(weekStart, i);
    days.push({ date, slots: generateDemoSlots(date) });
  }
  return days;
}

/* --------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

export const AvailabilityCalendar = memo(function AvailabilityCalendar({
  practitionerSlug,
  practitionerName,
  onSlotSelect,
}: AvailabilityCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);

  const weekStart = useMemo(() => {
    const now = new Date();
    const mondayStart = startOfWeek(now, { weekStartsOn: 1 });
    return addDays(mondayStart, weekOffset * 7);
  }, [weekOffset]);

  const schedule = useMemo(() => generateWeekSchedule(weekStart), [weekStart]);

  const weekLabel = useMemo(() => {
    const end = addDays(weekStart, 5);
    if (weekStart.getMonth() === end.getMonth()) {
      return `${format(weekStart, "d")} - ${format(end, "d MMMM yyyy")}`;
    }
    return `${format(weekStart, "d MMM")} - ${format(end, "d MMM yyyy")}`;
  }, [weekStart]);

  const handleSlotClick = useCallback(
    (date: Date, time: string) => {
      setSelectedSlot({ date, time });
      onSlotSelect?.(date, time);
    },
    [onSlotSelect]
  );

  const availableCount = useMemo(() => {
    return schedule.reduce(
      (sum, day) => sum + day.slots.filter((s) => s.available).length,
      0
    );
  }, [schedule]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-primary-600" />
          <div>
            <h3 className="font-semibold text-primary-900 text-sm">
              {practitionerName
                ? `${practitionerName}'s Availability`
                : "Available Appointments"}
            </h3>
            <p className="text-xs text-neutral-500">
              {availableCount} slots available this week
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              weekOffset === 0
                ? "text-neutral-300 cursor-not-allowed"
                : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
            )}
            aria-label="Previous week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-primary-900 min-w-[180px] text-center">
            {weekLabel}
          </span>
          <button
            onClick={() => setWeekOffset(Math.min(4, weekOffset + 1))}
            disabled={weekOffset >= 4}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              weekOffset >= 4
                ? "text-neutral-300 cursor-not-allowed"
                : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
            )}
            aria-label="Next week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Day Headers */}
          <div className="grid grid-cols-6 border-b border-neutral-100">
            {schedule.map((day) => {
              const today = isToday(day.date);
              const dayAvailable = day.slots.some((s) => s.available);
              return (
                <div
                  key={day.date.toISOString()}
                  className={cn(
                    "px-3 py-3 text-center border-r last:border-r-0 border-neutral-50",
                    today && "bg-primary-50/50"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-medium",
                      today ? "text-primary-700" : "text-neutral-500"
                    )}
                  >
                    {format(day.date, "EEE")}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      today ? "text-primary-900" : "text-primary-800"
                    )}
                  >
                    {format(day.date, "d")}
                  </p>
                  {today && (
                    <Badge variant="default" size="sm" className="mt-1 text-[10px]">
                      Today
                    </Badge>
                  )}
                  {!dayAvailable && day.slots.length > 0 && (
                    <p className="text-[10px] text-neutral-400 mt-1">Full</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-6 max-h-[400px] overflow-y-auto">
            {schedule.map((day) => (
              <div
                key={day.date.toISOString()}
                className="border-r last:border-r-0 border-neutral-50 p-1.5 space-y-1"
              >
                {day.slots.length === 0 && (
                  <div className="text-center py-8 text-neutral-300 text-xs">
                    No sessions
                  </div>
                )}
                {day.slots.map((slot) => {
                  const isSelected =
                    selectedSlot &&
                    isSameDay(selectedSlot.date, day.date) &&
                    selectedSlot.time === slot.time;

                  return (
                    <button
                      key={`${day.date.toISOString()}-${slot.time}`}
                      disabled={!slot.available}
                      onClick={() => handleSlotClick(day.date, slot.time)}
                      className={cn(
                        "w-full px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                        slot.available
                          ? isSelected
                            ? "bg-primary-700 text-white shadow-md shadow-primary-200"
                            : "bg-primary-50 text-primary-700 hover:bg-primary-100 hover:shadow-sm cursor-pointer"
                          : "bg-neutral-50 text-neutral-300 cursor-not-allowed"
                      )}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Slot Action */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 border-t border-neutral-100 bg-primary-50/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-900">
                    {format(selectedSlot.date, "EEEE, d MMMM yyyy")} at{" "}
                    {selectedSlot.time}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Video className="w-3 h-3" />
                    <span>50 min telehealth session</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  // In production, this would navigate to booking
                  onSlotSelect?.(selectedSlot.date, selectedSlot.time);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-xl hover:bg-primary-800 transition-colors group shadow-md shadow-primary-200"
              >
                Book This Slot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-neutral-100 flex items-center gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary-50 border border-primary-200" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary-700" />
          Selected
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-neutral-50 border border-neutral-200" />
          Unavailable
        </div>
      </div>
    </div>
  );
});

AvailabilityCalendar.displayName = "AvailabilityCalendar";
