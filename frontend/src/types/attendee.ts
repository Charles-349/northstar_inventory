export interface CheckInResponse {
  message: string;
  status: string;
  jobId: string;
}

export interface Attendee {
  id: number;
  qrCode: string;
  fullName: string;
  status: string;
  checkedInAt: string | null;
}