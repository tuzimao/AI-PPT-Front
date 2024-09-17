// src/components/Point.tsx

import React, { useState } from 'react';
import { Point } from '../types/outline';
import { editOutline } from '../services/api';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface PointProps {
  point: Point;
  outlineId: string;
  setOutline: React.Dispatch<React.SetStateAction<any>>;
}

const PointComponent: React.FC<PointProps> = ({ point, outlineId, setOutline }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(point.title);

  const handleEdit = async () => {
    const updatedOutline = await editOutline(outlineId, { pointId: point.id }, newTitle, false);
    setOutline(updatedOutline);
    setOpen(false);
  };

  return (
    <Box sx={{ border: '1px solid #777', padding: '6px', marginTop: '6px', marginLeft: '40px' }}>
      <Typography variant="body1">
        {point.title}
        <Button variant="outlined" size="small" onClick={() => setOpen(true)} style={{ marginLeft: '10px' }}>
          编辑
        </Button>
      </Typography>

      {/* 编辑对话框 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>编辑小点</DialogTitle>
        <DialogContent>
          <DialogContentText>修改小点内容。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="小点内容"
            fullWidth
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleEdit}>保存</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PointComponent;
