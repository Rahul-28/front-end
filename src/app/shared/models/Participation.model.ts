export interface IParticipation {
  _id: number;
  eventId: number;
  userId: number;
  status: Status;
}

enum Status {
  'PENDING' = 'PENDING',
  'CONFIRMED' = 'CONFIRMED',
  'CANCELLED' = 'CANCELLED',
}
