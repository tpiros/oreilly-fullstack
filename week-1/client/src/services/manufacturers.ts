import { Car, Manufacturer } from '../interfaces/interfaces';
import { request } from './request';

export function getManufacturers() {
  return request<Manufacturer[]>('/manufacturers');
}

export function getManufacturer(id: string) {
  return request<Manufacturer>(`/manufacturers/${id}`);
}

export function addModel(id: string, modelData: Car) {
  console.log(id, modelData);
  return request<Manufacturer>(`/manufacturers/${id}/model`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: modelData }),
  });
}
