// export default function Index() {
//   return (
//     <div>
//       <h1>Main Page</h1>
//       <p>This is the main page</p>
//     </div>
//   );
// }

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({
  name,
  languages,
  city,
  region,
  country,
  currencyCode,
  currencySymbol,
}) {
  name = decodeURIComponent(name);
  city = decodeURIComponent(city);
  return (
    <div className="center">
      {/* eslint-disable-next-line */}
      <img
        alt={`${country} flag`}
        src={`https://flagcdn.com/96x72/${country.toLowerCase()}.png`}
        width={32}
        height={32}
      />
      <h1>Well, hello there!</h1>
      <h2>
        How&#39;s things in {city}, {country} in {region}?
      </h2>
      <h4>Languages</h4>
      <p>{languages}</p>
      <h4>Currency</h4>
      <p>
        <b>{`${currencyCode} ${currencySymbol}`}</b> known as the <b>{name}</b>
      </p>
    </div>
  );
}
