import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FetchTeam, Player } from '../types/types';

const GET_TEAM = gql`
  query GetTeam($teamId: Int!) {
    team(id: $teamId) {
      name
      city
      country
      stadium
      players {
        id
        name
      }
    }
  }
`;

export default function Team() {
  const { teamId } = useParams();
  const { loading, error, data } = useQuery<FetchTeam>(GET_TEAM, {
    variables: { teamId: +teamId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div id="main">
        <h1>
          {data?.team.name} ({data?.team.city}, {data?.team.country})
        </h1>
        <h3>Home: {data?.team.stadium}</h3>
      </div>

      <h2>Current players</h2>
      <ul>
        {data?.team.players?.map((player: Pick<Player, 'id' | 'name'>) => (
          <li key={player.id}>
            <Link to={`player/${player.id}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  );
}
