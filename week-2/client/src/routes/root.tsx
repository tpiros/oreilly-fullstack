import { Outlet, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FetchTeams } from '../types/types';

const GET_TEAMS = gql`
  query GetUsers {
    teams {
      id
      name
    }
  }
`;

export default function Root() {
  const { loading, error, data } = useQuery<FetchTeams>(GET_TEAMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <div id="sidebar">
        <h1>Footie App</h1>
        <nav>
          <ul>
            {data?.teams.map(({ id, name }: { id: number; name: string }) => (
              <li key={id}>
                <Link to={`teams/${id}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
