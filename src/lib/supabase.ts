import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Use environment variables if available, otherwise fallback to the values in integrations/supabase/client.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://wdeljshcghpxzlwmyvlr.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZWxqc2hjZ2hweHpsd215dmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDUzNjMsImV4cCI6MjA1ODQ4MTM2M30.Ak2Y4Se2MaCCZn4QNxj66glmGWcRdKaXYsXQlUGVRdU";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Type-safe database interfaces
export interface Profile {
  id: string;
  email: string;
  mobile_number: string;
  status: 'active' | 'inactive' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string;
  language: 'english' | 'hindi';
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  playlist_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string;
  video_id: string;
  duration: string;
  position: number;
  created_at: string;
  updated_at: string;
}

// Auth functions
export const signInWithOTP = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) throw error;
};

export const verifyOTP = async (email: string, token: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
  if (error) throw error;
};

export const updateProfile = async (mobile_number: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user found');

  const { error } = await supabase
    .from('profiles')
    .update({ mobile_number })
    .eq('id', user.id);

  if (error) throw error;
};

export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user found');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Database queries
export const getPlaylists = async (language: string) => {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('language', language)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getVideos = async (playlist_id: string) => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('playlist_id', playlist_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getPlaylist = async (id: string) => {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getPlaylistVideos = async (playlistId: string) => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('playlist_id', playlistId)
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
};

export const getVideo = async (id: string) => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};
