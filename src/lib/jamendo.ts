// Jamendo API Service
// Free music streaming API - https://developer.jamendo.com/

// The client_id is loaded from environment variables (.env file)
// This keeps the API key private and out of Git!
// In Astro, PUBLIC_ prefix makes the variable available on client-side
export const JAMENDO_CLIENT_ID = import.meta.env.PUBLIC_JAMENDO_CLIENT_ID || '';
export const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3.0';

export interface JamendoTrack {
    id: string;
    name: string;
    artist_name: string;
    album_name: string;
    duration: number; // in seconds
    image: string;
    audio: string; // streaming URL
    audiodownload: string;
}

export interface JamendoPlaylist {
    id: string;
    name: string;
    creationdate: string;
    tracks: JamendoTrack[];
}

export interface JamendoSearchResult {
    headers: {
        status: string;
        results_count: number;
    };
    results: JamendoTrack[];
}

// Format duration from seconds to MM:SS
export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Search tracks by query
export async function searchTracks(query: string, limit = 20): Promise<JamendoTrack[]> {
    try {
        const params = new URLSearchParams({
            client_id: JAMENDO_CLIENT_ID,
            format: 'json',
            limit: limit.toString(),
            search: query,
            include: 'musicinfo',
            audioformat: 'mp32', // MP3 320kbps
        });

        const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${params}`);
        const data: JamendoSearchResult = await response.json();

        return data.results || [];
    } catch (error) {
        console.error('Error searching Jamendo tracks:', error);
        return [];
    }
}

// Get tracks by tag/genre (e.g., "lofi", "chill", "electronic")
export async function getTracksByTag(tag: string, limit = 20): Promise<JamendoTrack[]> {
    try {
        const params = new URLSearchParams({
            client_id: JAMENDO_CLIENT_ID,
            format: 'json',
            limit: limit.toString(),
            tags: tag,
            audioformat: 'mp32',
        });

        const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${params}`);
        const data: JamendoSearchResult = await response.json();

        return data.results || [];
    } catch (error) {
        console.error('Error fetching Jamendo tracks by tag:', error);
        return [];
    }
}

// Get popular/featured tracks
export async function getPopularTracks(limit = 20): Promise<JamendoTrack[]> {
    try {
        const params = new URLSearchParams({
            client_id: JAMENDO_CLIENT_ID,
            format: 'json',
            limit: limit.toString(),
            order: 'popularity_total',
            audioformat: 'mp32',
        });

        const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${params}`);
        const data: JamendoSearchResult = await response.json();

        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular Jamendo tracks:', error);
        return [];
    }
}

// Get tracks by specific genre for curated playlists
export async function getPlaylistByGenre(genre: string, limit = 10): Promise<JamendoTrack[]> {
    return getTracksByTag(genre, limit);
}

// Predefined playlist configurations
export const CURATED_PLAYLISTS = {
    lofi: {
        id: 'lofi-chill',
        title: 'Lo-Fi Chill',
        description: 'Relaxing lo-fi beats for study and work',
        tags: ['lofi', 'chillout'],
        color: '#7dcfff'
    },
    electronic: {
        id: 'electronic-vibes',
        title: 'Electronic Vibes',
        description: 'Modern electronic music',
        tags: ['electronic', 'ambient'],
        color: '#bb9af7'
    }
};
