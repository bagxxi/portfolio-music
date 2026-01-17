import { create } from "zustand";

// Extended player store to support Jamendo tracks and navigation
export const usePlayerStore = create((set, get) => ({
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: [],
    currentIndex: 0
  },
  volume: 1,

  // Basic setters
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),

  // Play a specific track from a playlist
  playTrack: (track, playlist = null, allTracks = []) => {
    const index = allTracks.findIndex(t => t.id === track.id);
    set({
      currentMusic: {
        playlist,
        song: track,
        songs: allTracks,
        currentIndex: index >= 0 ? index : 0
      },
      isPlaying: true
    });
  },

  // Play a Jamendo track directly
  playJamendoTrack: (jamendoTrack) => {
    const song = {
      id: jamendoTrack.id,
      title: jamendoTrack.name,
      artists: [jamendoTrack.artist_name],
      album: jamendoTrack.album_name,
      image: jamendoTrack.image,
      duration: formatDuration(jamendoTrack.duration),
      audioUrl: jamendoTrack.audio
    };
    set({
      currentMusic: {
        playlist: null,
        song,
        songs: [song],
        currentIndex: 0
      },
      isPlaying: true
    });
  },

  // Play next track
  nextTrack: () => {
    const { currentMusic } = get();
    const { songs, currentIndex } = currentMusic;

    if (songs.length === 0) return;

    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];

    set({
      currentMusic: {
        ...currentMusic,
        song: nextSong,
        currentIndex: nextIndex
      }
    });
  },

  // Play previous track
  prevTrack: () => {
    const { currentMusic } = get();
    const { songs, currentIndex } = currentMusic;

    if (songs.length === 0) return;

    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];

    set({
      currentMusic: {
        ...currentMusic,
        song: prevSong,
        currentIndex: prevIndex
      }
    });
  }
}));

// Helper to format duration from seconds to MM:SS
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}