import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/store/playerStore';

// Jamendo API configuration
const JAMENDO_CLIENT_ID = import.meta.env.PUBLIC_JAMENDO_CLIENT_ID || '';
const JAMENDO_BASE_URL = 'https://api.jamendo.com/v3.0';

// Format duration from seconds to MM:SS
function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface JamendoTrack {
    id: string;
    name: string;
    artist_name: string;
    album_name: string;
    duration: number;
    image: string;
    audio: string;
}

export function MusicSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<JamendoTrack[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const playJamendoTrack = usePlayerStore(state => state.playJamendoTrack);

    const searchTracks = async (searchQuery: string) => {
        if (!JAMENDO_CLIENT_ID) {
            console.error('Jamendo client_id not configured');
            return [];
        }

        try {
            const params = new URLSearchParams({
                client_id: JAMENDO_CLIENT_ID,
                format: 'json',
                limit: '20',
                search: searchQuery,
                audioformat: 'mp32',
            });

            const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${params}`);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error searching Jamendo tracks:', error);
            return [];
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setHasSearched(true);

        const tracks = await searchTracks(query);
        setResults(tracks);
        setIsLoading(false);
    };

    const handlePlay = (track: JamendoTrack) => {
        playJamendoTrack(track);
    };

    // Play all results as a playlist
    const handlePlayAll = () => {
        if (results.length > 0) {
            // Convert all results to player format
            const songs = results.map(track => ({
                id: track.id,
                title: track.name,
                artists: [track.artist_name],
                album: track.album_name,
                image: track.image,
                duration: formatDuration(track.duration),
                audioUrl: track.audio
            }));

            usePlayerStore.setState({
                currentMusic: {
                    playlist: { id: 'search', title: query },
                    song: songs[0],
                    songs: songs,
                    currentIndex: 0
                },
                isPlaying: true
            });
        }
    };

    return (
        <div className="music-search">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar canciones, artistas, géneros..."
                        className="w-full px-4 py-3 bg-surface-light border border-surface-lighter/30 rounded-full text-text placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                        🔍
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !JAMENDO_CLIENT_ID}
                    className="px-6 py-3 bg-accent-cyan text-void font-semibold rounded-full hover:bg-accent-green transition-all disabled:opacity-50"
                >
                    {isLoading ? '...' : 'Buscar'}
                </button>
            </form>

            {/* API Key Warning */}
            {!JAMENDO_CLIENT_ID && (
                <div className="mb-6 p-4 border border-accent-orange/50 rounded-lg bg-accent-orange/10">
                    <p className="text-accent-orange text-sm">
                        ⚠️ No se ha configurado el client_id de Jamendo.
                        Añade <code className="text-accent-cyan">PUBLIC_JAMENDO_CLIENT_ID</code> en tu archivo <code className="text-accent-cyan">.env</code>
                    </p>
                </div>
            )}

            {/* Results */}
            {isLoading && (
                <div className="text-center py-8 text-text-muted">
                    <span className="animate-pulse">Buscando en Jamendo...</span>
                </div>
            )}

            {!isLoading && hasSearched && results.length === 0 && (
                <div className="text-center py-8 text-text-muted">
                    No se encontraron resultados para "{query}"
                </div>
            )}

            {!isLoading && results.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-text-muted">
                            {results.length} resultados para "{query}"
                        </p>
                        <button
                            onClick={handlePlayAll}
                            className="text-sm text-accent-cyan hover:text-accent-green transition-colors"
                        >
                            ▶ Reproducir todo
                        </button>
                    </div>

                    {/* Track list header */}
                    <div className="flex items-center gap-4 px-4 py-2 text-xs text-text-muted uppercase tracking-wide border-b border-surface-lighter/30">
                        <span className="w-8">#</span>
                        <span className="w-12"></span>
                        <span className="flex-1">Título</span>
                        <span className="w-48 hidden md:block">Álbum</span>
                        <span className="w-16 text-right">Duración</span>
                        <span className="w-10"></span>
                    </div>

                    {results.map((track, index) => (
                        <div
                            key={track.id}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-light/50 group transition-colors border border-transparent hover:border-accent-cyan/20"
                        >
                            <span className="text-text-muted text-sm w-8 font-mono">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            <img
                                src={track.image || '/placeholder.svg'}
                                alt={track.name}
                                className="w-12 h-12 rounded object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                            />

                            <div className="flex-1 min-w-0">
                                <h4 className="text-text-bright font-medium truncate group-hover:text-accent-cyan transition-colors">
                                    {track.name}
                                </h4>
                                <p className="text-sm text-text-muted truncate">
                                    {track.artist_name}
                                </p>
                            </div>

                            <span className="w-48 text-text-muted text-sm truncate hidden md:block">
                                {track.album_name}
                            </span>

                            <span className="w-16 text-text-muted text-sm font-mono text-right">
                                {formatDuration(track.duration)}
                            </span>

                            <button
                                onClick={() => handlePlay(track)}
                                className="w-10 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-accent-cyan text-void rounded-full hover:scale-110 text-xs"
                                title="Reproducir"
                            >
                                ▶
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Attribution */}
            <div className="mt-6 pt-4 border-t border-surface-lighter/20 text-center">
                <p className="text-xs text-text-muted">
                    Música proporcionada por{' '}
                    <a
                        href="https://www.jamendo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline"
                    >
                        Jamendo
                    </a>
                    {' '}• Licencia Creative Commons
                </p>
            </div>
        </div>
    );
}
