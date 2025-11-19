export interface Transport {
  type: 'flight' | 'boat' | 'bus' | 'taxi' | 'combination';
  details: string;
  departureTime?: string;
  arrivalTime?: string;
  from?: string;
  to?: string;
}

export interface TripLeg {
  id: string;
  location: string;
  subLocation?: string;
  dates: string;
  nights: number;
  accommodation: {
    name: string;
    address: string;
    mapLink?: string;
  };
  transportTo?: Transport[];
  description: string;
  imagePlaceholder: string;
  mdFileName: string;
  contentMarkdown?: string;
}

export interface ActivitySuggestion {
  title: string;
  description: string;
}
