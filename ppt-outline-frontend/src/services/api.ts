// src/services/api.ts

import axios from 'axios';
import { Outline } from '../types/outline';

const API_BASE_URL = 'http://localhost:5000/api'; // 根据实际情况调整

export const getOutline = async (outlineId: string): Promise<Outline> => {
  const response = await axios.get<Outline>(`${API_BASE_URL}/outlines/${outlineId}`);
  return response.data;
};

export const createOutline = async (title: string): Promise<Outline> => {
  const response = await axios.post<Outline>(`${API_BASE_URL}/outlines`, { title });
  return response.data;
};

export const editOutline = async (
  outlineId: string,
  editPath: { chapterId?: string; subChapterId?: string; pointId?: string },
  newTitle: string,
  regenerate: boolean
): Promise<Outline> => {
  const response = await axios.put<Outline>(`${API_BASE_URL}/outlines/${outlineId}`, {
    editPath,
    newTitle,
    regenerate,
  });
  return response.data;
};
