import React from 'react';
import { Paper} from '@mui/material';

type ItemProps = {
  image: {
    id: number;
    trackId: number;
    img: string;
  };
};

export default function Item({ image }: ItemProps): JSX.Element {
  return (
    <Paper>
      <img src={image.img} alt="img" />
    </Paper>
  );
}
