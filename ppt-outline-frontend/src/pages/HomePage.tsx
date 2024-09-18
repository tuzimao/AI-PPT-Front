// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { Outline } from '../types/outline';
import { getOutline, createOutline } from '../services/api';
import OutlineView from '../components/OutlineView';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const HomePage: React.FC = () => {
  const [outline, setOutline] = useState<Outline | null>(null);
  const [newOutlineTitle, setNewOutlineTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 创建一个新大纲
  const handleCreateOutline = async () => {
    if (!newOutlineTitle.trim()) {
      alert('请填写大纲标题');
      return;
    }
    setLoading(true);
    try {
      const createdOutline = await createOutline(newOutlineTitle);
      setOutline(createdOutline);
      setNewOutlineTitle('');
    } catch (error) {
      console.error('创建大纲失败:', error);
      alert('创建大纲失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 加载现有大纲（根据需要实现）
  // const loadOutline = async () => {
  //   const outlineId = 'your_outline_id_here'; // 替换为实际的 outline ID
  //   const fetchedOutline = await getOutline(outlineId);
  //   setOutline(fetchedOutline);
  // };

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
        <Box display="flex" alignItems="center">
          <TextField
            label="新大纲标题"
            value={newOutlineTitle}
            onChange={(e) => setNewOutlineTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOutline}
            style={{ marginLeft: '10px' }}
            disabled={loading}
          >
            {loading ? '创建中...' : '创建大纲'}
          </Button>
        </Box>
      ) : (
        <OutlineView outline={outline} setOutline={setOutline} />
      )}
    </Container>
  );
};

export default HomePage;
