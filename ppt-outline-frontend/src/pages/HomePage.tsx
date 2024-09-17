// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { Outline, Chapter, SubChapter, Point } from '../types/outline';
import { getOutline, createOutline, editOutline } from '../services/api';
import OutlineView from '../components/OutlineView';
import { Button, TextField, Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  const [outline, setOutline] = useState<Outline | null>(null);
  const [newOutlineTitle, setNewOutlineTitle] = useState<string>('');

  // 示例：创建一个新大纲
  const handleCreateOutline = async () => {
    const createdOutline = await createOutline(newOutlineTitle);
    setOutline(createdOutline);
  };

  // 示例：加载现有大纲（需要替换为实际的 outlineId）
  const loadOutline = async () => {
    const outlineId = 'your_outline_id_here'; // 替换为实际的 outline ID
    const fetchedOutline = await getOutline(outlineId);
    setOutline(fetchedOutline);
  };

  useEffect(() => {
    // 可以在这里加载默认的大纲
    // loadOutline();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        PPT 大纲管理
      </Typography>

      {!outline ? (
        <div>
          <TextField
            label="新大纲标题"
            value={newOutlineTitle}
            onChange={(e) => setNewOutlineTitle(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCreateOutline} style={{ marginLeft: '10px' }}>
            创建大纲
          </Button>
        </div>
      ) : (
        <OutlineView outline={outline} setOutline={setOutline} />
      )}
    </Container>
  );
};

export default HomePage;
