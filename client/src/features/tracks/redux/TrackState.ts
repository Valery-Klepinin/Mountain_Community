import Track, { TrackPage } from '../types/Track';

type TrackState = {
  tracks: Track[] | TrackPage[];
  error: string | undefined;
  searchQuery: string;
  rating: number;
};

export default TrackState;
