// src/components/OutlineView.tsx

import React from 'react';
import { Outline } from '../types/outline';
import ChapterComponent from './Chapter';
import { Typography, Box } from '@mui/material';

interface OutlineViewProps {
  outline: Outline;
  setOutline: React.Dispatch<React.SetStateAction<Outline | null>>;
}

const OutlineView: React.FC<OutlineViewProps> = ({ outline, setOutline }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        {outline.title}
      </Typography>
      {outline.chapters.map((chapter, index) => (
        <ChapterComponent key={chapter.id} chapter={chapter} outlineId={outline.id} setOutline={setOutline} />
      ))}
    </Box>
  );
};

export default OutlineView;
