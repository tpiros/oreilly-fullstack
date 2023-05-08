const Placeholder = ({
  loading,
  src,
}: {
  loading: Boolean;
  src: File | undefined;
}) => {
  const blob = new Blob([src!], { type: src!?.type });
  return (
    <div className="max-w-sm rounded-lg shadow-2xl">
      <div className={`${loading ? 'animate-pulse' : ''} flex`}>
        <div className="rounded-lg bg-blue-400 h-56 w-56 dtext-blue-500 items-center justify-center">
          {loading && (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="preview" src={`${URL.createObjectURL(blob)}`}></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
