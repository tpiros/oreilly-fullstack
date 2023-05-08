export type Manufacturer = {
  id: string;
  name: string;
  headquarters: string;
  established: string;
  models: Car[];
};

export type Car = {
  id: string;
  model: string;
  manufacturerId: string;
};
