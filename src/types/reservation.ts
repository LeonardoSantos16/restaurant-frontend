export interface ReservationRequest {
  /** ISO date (yyyy-mm-dd), from <input type="date">. */
  date: string;
  /** One of TIME_SLOTS, format "HH:mm". */
  time: string;
  partySize: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface Reservation extends ReservationRequest {
  id: string;
  status: 'confirmed';
  createdAt: string;
}
