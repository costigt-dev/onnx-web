import { mustExist } from '@apextoaster/js-utils';
import { Box, Button, Stack } from '@mui/material';
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useStore } from 'zustand';

import { ClientContext, ConfigContext, StateContext } from '../state.js';
import { ImageControl } from './ImageControl.js';
import { NumericField } from './NumericField.js';
import { UpscaleControl } from './UpscaleControl.js';

const { useContext } = React;

export function Txt2Img() {
  const config = mustExist(useContext(ConfigContext));

  async function generateImage() {
    const { model, txt2img, upscale } = state.getState();
    const output = await client.txt2img(model, txt2img, upscale);

    setLoading(output);
  }

  const client = mustExist(useContext(ClientContext));
  const query = useQueryClient();
  const generate = useMutation(generateImage, {
    onSuccess: () => query.invalidateQueries({ queryKey: 'ready' }),
  });

  const state = mustExist(useContext(StateContext));
  const height = useStore(state, (s) => s.txt2img.height);
  const width = useStore(state, (s) => s.txt2img.width);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const setTxt2Img = useStore(state, (s) => s.setTxt2Img);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const setLoading = useStore(state, (s) => s.setLoading);

  return <Box>
    <Stack spacing={2}>
      <ImageControl config={config} selector={(s) => s.txt2img} onChange={setTxt2Img} />
      <Stack direction='row' spacing={4}>
        <NumericField
          label='Width'
          min={config.width.min}
          max={config.width.max}
          step={config.width.step}
          value={width}
          onChange={(value) => {
            setTxt2Img({
              width: value,
            });
          }}
        />
        <NumericField
          label='Height'
          min={config.height.min}
          max={config.height.max}
          step={config.height.step}
          value={height}
          onChange={(value) => {
            setTxt2Img({
              height: value,
            });
          }}
        />
      </Stack>
      <UpscaleControl config={config} />
      <Button onClick={() => generate.mutate()}>Generate</Button>
    </Stack>
  </Box>;
}
