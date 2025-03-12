export interface IEvent {
  _id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: ILocation;
  adminClearence: Boolean;
  category: string;
  ticketsAvailable: number;
  price: number;
  organizer: number;
}

interface ILocation {
  address: string;
  coordinates: [number, number];
}
