import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Whoopsies!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.name || error.message}</i>
      </p>
    </div>
  );
}
