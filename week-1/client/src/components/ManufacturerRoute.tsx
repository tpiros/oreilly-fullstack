import { ChangeEvent, useEffect, useState } from 'react';
import { Car, Manufacturer } from '../interfaces/interfaces';
import { addModel, getManufacturer } from '../services/manufacturers';
import { useParams } from 'react-router-dom';

export default function ManufacturerRoute() {
  const [manufacturer, setManufacturer] = useState<Manufacturer>(
    {} as Manufacturer
  );
  const [model, setModel] = useState('');
  const [submit, setSubmit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const manufacturer = await getManufacturer(id!);
      if (!ignore) {
        setManufacturer(manufacturer);
      }
    }
    void fetchData();

    return () => {
      ignore = true;
    };
  }, [id, submit]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  const submitData = async () => {
    await addModel(id!, model as unknown as Car);
    setModel('');
    setSubmit(true);
  };
  return (
    <>
      <h1>Manufacturer: {manufacturer.name}</h1>
      <ul>
        {manufacturer?.models?.map(({ id, model }) => (
          <li key={id}>{model}</li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submitData();
        }}
      >
        <input type="text" name="model" value={model} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
