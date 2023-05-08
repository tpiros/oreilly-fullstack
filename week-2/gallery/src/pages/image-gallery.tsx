import useSWR, { Fetcher, mutate, preload } from 'swr';
import CldImage from '../components/CldImage';
import DisplayError from '../components/DisplayError';
import Loading from '../components/Loading';

type Gallery = {
  public_ids: string[];
};

const fetcher: Fetcher<Gallery> = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.message = await res.json();
      throw error;
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
preload(`/api/gallery`, fetcher);

export default function ImageGallery() {
  const { data, error } = useSWR<Gallery>(`/api/gallery`, fetcher);
  if (error) return <DisplayError error={error} />;
  if (!data) return <Loading />;
  mutate(data);
  return (
    <div className="mx-auto p-8">
      <div className="flex flex-row flex-wrap -mx-2">
        {data?.public_ids?.map((result, i) => {
          return (
            <div
              className="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-full sm:w-full w-full mb-4 sm:mb-4 px-2"
              key={i}
            >
              <CldImage publicId={result} gallery={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
