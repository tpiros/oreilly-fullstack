import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FetchPlayer } from '../types/types';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { AdvancedImage } from '@cloudinary/react';
import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';

const GET_PLAYER = gql`
  query GetPlayer($playerId: Int!) {
    player(id: $playerId) {
      id
      name
      number
      age
    }
  }
`;

const getPlayerPhoto = (name: string) => {
  const publicId = name.replaceAll(' ', '-').toLowerCase();
  const cld = new Cloudinary({
    cloud: { cloudName: 'tamas-demo' },
    url: { secure: true },
  });

  const playerPhoto = cld.image(`football-players/${publicId}`);
  playerPhoto
    .resize(
      thumbnail().width(200).height(200).zoom(0.7).gravity(focusOn(face()))
    )
    .delivery(defaultImage('avatar.png'))
    .overlay(
      source(
        text(name, new TextStyle('Helvetica', 20))
          .textColor('#000')
          .backgroundColor('#ff5050')
      ).position(new Position().gravity(compass('south')).offsetY(10))
    )
    .format('auto')
    .quality('auto');

  return <AdvancedImage cldImg={playerPhoto} />;
};

export default function Team() {
  const { playerId } = useParams();
  const { loading, error, data } = useQuery<FetchPlayer>(GET_PLAYER, {
    variables: { playerId: +playerId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        <h1>{data?.player.name}</h1>
        <p>
          {data?.player.name} is {data?.player.age} years old. Usually wears
          number #{data?.player.number}.
        </p>
        <>{getPlayerPhoto(data?.player.name!)}</>
      </div>
    </>
  );
}
