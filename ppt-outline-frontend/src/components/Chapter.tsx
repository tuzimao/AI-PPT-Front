// src/components/Chapter.tsx

import React, { useState } from 'react';
import { Chapter } from '../types/outline';
import SubChapterComponent from './SubChapter';
import { editOutline } from '../services/api';
import { Button, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ChapterProps {
  chapter: Chapter;
  outlineId: string;
  setOutline: React.Dispatch<React.SetStateAction<any>>;
}

const ChapterComponent: React.FC<ChapterProps> = ({ chapter, outlineId, setOutline }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(chapter.title);
  const [regenerate, setRegenerate] = useState<boolean>(false);

  const handleEdit = async () => {
    const updatedOutline = await editOutline(outlineId, { chapterId: chapter.id }, newTitle, regenerate);
    setOutline(updatedOutline);
    setOpen(false);
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <Typography variant="h6">
        {chapter.title}
        <Button variant="outlined" size="small" onClick={() => setOpen(true)} style={{ marginLeft: '10px' }}>
          编辑
        </Button>
      </Typography>
      {chapter.subChapters.map((subChapter, index) => (
        <SubChapterComponent key={subChapter.id} subChapter={subChapter} outlineId={outlineId} setOutline={setOutline} />
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
            <label>
              <input type="checkbox" checked={regenerate} onChange={(e) => setRegenerate(e.target.checked)} />
              &nbsp;根据新的章节标题重新生成子章节
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleEdit}>保存</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChapterComponent;
