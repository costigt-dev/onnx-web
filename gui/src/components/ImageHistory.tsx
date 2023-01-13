import { doesExist, mustExist } from '@apextoaster/js-utils';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import * as React from 'react';
import { useStore } from 'zustand';

import { StateContext } from '../state.js';
import { ImageCard } from './ImageCard.js';
import { LoadingCard } from './LoadingCard.js';

export function ImageHistory() {
  const history = useStore(mustExist(useContext(StateContext)), (state) => state.history);
  const limit = useStore(mustExist(useContext(StateContext)), (state) => state.limit);
  const loading = useStore(mustExist(useContext(StateContext)), (state) => state.loading);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const removeHistory = useStore(mustExist(useContext(StateContext)), (state) => state.removeHistory);

  const children = [];

  if (doesExist(loading)) {
    children.push(<LoadingCard key='loading' loading={loading} />);
  }

  if (history.length > 0) {
    children.push(...history.map((item) => <ImageCard key={item.output.key} value={item} onDelete={removeHistory} />));
  } else {
    if (doesExist(loading) === false) {
      children.push(<div>No results. Press Generate.</div>);
    }
  }

  const limited = children.slice(0, limit);

  return <Grid container spacing={2}>{limited.map((child, idx) => <Grid item key={idx} xs={6}>{child}</Grid>)}</Grid>;
}
