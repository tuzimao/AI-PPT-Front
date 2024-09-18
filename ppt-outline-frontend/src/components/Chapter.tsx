// src/components/Chapter.tsx

import React, { useState } from 'react';
import { Chapter } from '../types/outline';
import SubChapterComponent from './SubChapter';
import { editOutline } from '../services/api';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface ChapterProps {
  chapter: Chapter;
  outlineId: string;
  setOutline: React.Dispatch<React.SetStateAction<any>>;
}

const ChapterComponent: React.FC<ChapterProps> = ({ chapter, outlineId, setOutline }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(chapter.title);
  const [regenerate, setRegenerate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (!newTitle.trim()) {
      alert('章节标题不能为空');
      return;
    }
    setLoading(true);
    try {
      const updatedOutline = await editOutline(outlineId, { chapterId: chapter.id }, newTitle, regenerate);
      setOutline(updatedOutline);
      setOpen(false);
    } catch (error) {
      console.error('编辑章节失败:', error);
      alert('编辑章节失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>
      <Typography variant="h6">
        {chapter.title}
        <Button variant="outlined" size="small" onClick={() => setOpen(true)} style={{ marginLeft: '10px' }}>
          编辑
        </Button>
      </Typography>
      {chapter.subChapters.map((subChapter, index) => (
        <SubChapterComponent key={subChapter.id} subChapter={subChapter} outlineId={outline.id} setOutline={setOutline} />
      ))}

      {/* 编辑对话框 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>编辑章节</DialogTitle>
        <DialogContent>
          <DialogContentText>修改章节标题并选择是否重新生成子章节内容。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="章节标题"
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
              label="根据新的章节标题重新生成子章节"
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

export default ChapterComponent;
