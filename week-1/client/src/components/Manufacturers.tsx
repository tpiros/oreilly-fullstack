import { useEffect, useState } from 'react';
import { Manufacturer } from '../interfaces/interfaces';
import { getManufacturers } from '../services/manufacturers';
import { Link } from 'react-router-dom';

export default function Manufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const manufacturers = await getManufacturers();
      if (!ignore) {
        setManufacturers(manufacturers);
      }
    }
    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <h1>Manufacturers</h1>
      <ul>
        {manufacturers.map((manufacturer) => (
          <li key={manufacturer.id}>
            <Link to={`${manufacturer.id}`}>{manufacturer.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
