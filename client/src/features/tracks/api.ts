import { Payload } from './types/Payload';
import Track from './types/Track';

export async function requestTracks(): Promise<Track[]> {
  const res = await fetch('/api/tracks');
  return await res.json();
}

export async function deleteTrack(trackId: number): Promise<number> {
  await fetch(`/api/tracks/${trackId}`, {
    method: 'DELETE',
  });

  return trackId;
}

export async function addComments(trackId: number, text: string): Promise<any> {
  const res = await fetch(`/api/tracks/comments`, {
    method: 'POST',
    body: JSON.stringify({ text, trackId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export async function requestComments(trackId: number): Promise<any> {
  const res = await fetch(`/api/tracks/${trackId}/comments`);
  return await res.json();
}

export const addTrackFetch = async (formData: FormData): Promise<Track> => {
  const res = await fetch('/api/tracks/add', {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export const updateTrackFetch = async (obj: Payload): Promise<Track> => {
  const res = await fetch(`/api/tracks/update/${obj.id}`, {
    method: 'PUT',
    body: obj.formData,
  });
  return res.json();
};

export const addRatingFetch = async (
  trackId: number,
  rating: number
): Promise<number> => {
  const res = await fetch('/api/tracks/ratings', {
    method: 'POST',
    body: JSON.stringify({ trackId, rating }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
