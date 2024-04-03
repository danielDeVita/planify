// types.ts

export interface Service {
  id: number;
  name: string;
  description: string;
}

export interface CategoryProps {
  category: string;
  services: Service[];
}

export interface CategoryItemProps {
  category: string;
  service: Service;
  onSelect: (service: Service) => void;
}

export interface Timeslot {
  timeslot: string;
}
