import { doesExist, mustExist } from '@apextoaster/js-utils';
import { Box, Button, Stack } from '@mui/material';
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useStore } from 'zustand';

import { ConfigParams, IMAGE_FILTER } from '../config.js';
import { ClientContext, StateContext } from '../state.js';
import { ImageControl } from './ImageControl.js';
import { ImageInput } from './ImageInput.js';
import { MaskCanvas } from './MaskCanvas.js';

const { useContext, useEffect } = React;

export interface InpaintProps {
  config: ConfigParams;

  model: string;
  platform: string;
}

export function Inpaint(props: InpaintProps) {
  const { config, model, platform } = props;
  const client = mustExist(useContext(ClientContext));

  async function uploadSource(): Promise<void> {
    const output = await client.inpaint({
      ...params,
      model,
      platform,
      mask: mustExist(params.mask),
      source: mustExist(params.source),
    });

    setLoading(output);
  }

  const state = mustExist(useContext(StateContext));
  const params = useStore(state, (s) => s.inpaint);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const setInpaint = useStore(state, (s) => s.setInpaint);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const setLoading = useStore(state, (s) => s.setLoading);

  const query = useQueryClient();
  const upload = useMutation(uploadSource, {
    onSuccess: () => query.invalidateQueries({ queryKey: 'ready' }),
  });

  useEffect(function changeSource() {
    // draw the source to the canvas if the mask has not been set
    if (doesExist(params.source) && doesExist(params.mask) === false) {
      setInpaint({
        mask: params.source,
      });
    }
  }, [params.source]);

  return <Box>
    <Stack spacing={2}>
      <ImageInput
        filter={IMAGE_FILTER}
        image={params.source}
        label='Source'
        onChange={(file) => {
          setInpaint({
            source: file,
          });
        }}
      />
      <ImageInput
        filter={IMAGE_FILTER}
        image={params.mask}
        label='Mask'
        onChange={(file) => {
          setInpaint({
            mask: file,
          });
        }}
        renderImage={(image) =>
          <MaskCanvas config={config} source={image} onSave={(mask) => {
            setInpaint({
              mask,
            });
          }} />
        }
      />
      <ImageControl
        config={config}
        params={params}
        onChange={(newParams) => {
          setInpaint(newParams);
        }}
      />
      <Button onClick={() => upload.mutate()}>Generate</Button>
    </Stack>
  </Box>;
}
