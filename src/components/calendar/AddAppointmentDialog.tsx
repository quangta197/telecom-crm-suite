import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LocationMapPicker } from "./LocationMapPicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface Appointment {
  id: number;
  title: string;
  time: string;
  type: "meeting" | "call" | "presentation" | "internal";
  location: string;
  attendees: number;
  date: Date;
  description?: string;
  mode: "online" | "offline";
  coordinates?: { lat: number; lng: number; address?: string };
  meetingLink?: string;
}

interface AddAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (appointment: Omit<Appointment, "id">) => void;
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00"
];

export function AddAppointmentDialog({
  open,
  onOpenChange,
  onAdd,
}: AddAppointmentDialogProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState<Appointment["type"]>("meeting");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("1");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; address?: string }>();
  const [meetingLink, setMeetingLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !title || !startTime || !endTime) return;

    onAdd({
      title,
      time: `${startTime} - ${endTime}`,
      type,
      location: mode === "online" ? (meetingLink || "Online") : (location || "TBD"),
      attendees: parseInt(attendees) || 1,
      date,
      description,
      mode,
      coordinates: mode === "offline" ? coordinates : undefined,
      meetingLink: mode === "online" ? meetingLink : undefined,
    });

    // Reset form
    setTitle("");
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setType("meeting");
    setLocation("");
    setAttendees("1");
    setDescription("");
    setMode("online");
    setCoordinates(undefined);
    setMeetingLink("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Appointment title"
                required
              />
            </div>

            {/* Date */}
            <div className="grid gap-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Time *</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>End Time *</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Type */}
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as Appointment["type"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mode Selection */}
            <div className="grid gap-2">
              <Label>Appointment Mode *</Label>
              <RadioGroup
                value={mode}
                onValueChange={(v) => setMode(v as "online" | "offline")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer">
                    <Video className="h-4 w-4 text-primary" />
                    Online
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4 text-destructive" />
                    Offline
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Online: Meeting Link */}
            {mode === "online" && (
              <div className="grid gap-2">
                <Label htmlFor="meetingLink">Meeting Link</Label>
                <Input
                  id="meetingLink"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                />
              </div>
            )}

            {/* Offline: Location */}
            {mode === "offline" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location Name</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Meeting room, Office address, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Select Location on Map</Label>
                  <LocationMapPicker
                    value={coordinates}
                    onChange={setCoordinates}
                  />
                </div>
              </>
            )}

            {/* Attendees */}
            <div className="grid gap-2">
              <Label htmlFor="attendees">Number of Attendees</Label>
              <Input
                id="attendees"
                type="number"
                min="1"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title || !date || !startTime || !endTime}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
