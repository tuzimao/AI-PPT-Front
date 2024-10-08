// src/components/SubChapter.tsx

import React, { useState } from 'react';
import { SubChapter } from '../types/outline';
import PointComponent from './Point';
import { editOutline } from '../services/api';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface SubChapterProps {
  subChapter: SubChapter;
  outlineId: string;
  setOutline: React.Dispatch<React.SetStateAction<any>>;
}

const SubChapterComponent: React.FC<SubChapterProps> = ({ subChapter, outlineId, setOutline }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(subChapter.title);
  const [regenerate, setRegenerate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (!newTitle.trim()) {
      alert('子章节标题不能为空');
      return;
    }
    setLoading(true);
    try {
      const updatedOutline = await editOutline(outlineId, { subChapterId: subChapter.id }, newTitle, regenerate);
      setOutline(updatedOutline);
      setOpen(false);
    } catch (error) {
      console.error('编辑子章节失败:', error);
      alert('编辑子章节失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ border: '1px solid #aaa', padding: '8px', marginTop: '8px', marginLeft: '20px', borderRadius: '5px' }}>
      <Typography variant="subtitle1">
        {subChapter.title}
        <Button variant="outlined" size="small" onClick={() => setOpen(true)} style={{ marginLeft: '10px' }}>
          编辑
        </Button>
      </Typography>
      {subChapter.points.map((point, index) => (
        <PointComponent key={point.id} point={point} outlineId={outlineId} setOutline={setOutline} />
      ))}

      {/* 编辑对话框 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>编辑子章节</DialogTitle>
        <DialogContent>
          <DialogContentText>修改子章节标题并选择是否重新生成小点内容。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="子章节标题"
            fullWidth
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={regenerate}
                  onChange={(e) => setRegenerate(e.target.checked)}
                  name="regenerate"
                  color="primary"
                />
              }
              label="根据新的子章节标题重新生成小点"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>取消</Button>
          <Button onClick={handleEdit} disabled={loading}>
            {loading ? '保存中...' : '保存'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubChapterComponent;
