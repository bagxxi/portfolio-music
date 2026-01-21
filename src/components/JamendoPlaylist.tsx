import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { JAMENDO_CLIENT_ID, JAMENDO_BASE_URL } from '@/lib/jamendo';

interface JamendoTrack {
    id: string;
    name: string;
    artist_name: string;
    album_name: string;
    duration: number;
    image: string;
    audio: string;
}

interface JamendoPlaylistProps {
    tag: string;
    title: string;
    description: string;
    accentColor: string;
}

function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function JamendoPlaylist({ tag, title, description, accentColor }: JamendoPlaylistProps) {
    const [tracks, setTracks] = useState<JamendoTrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const playJamendoTrack = usePlayerStore(state => state.playJamendoTrack);

    useEffect(() => {
        const fetchTracks = async () => {
            // Check if API key is configured
            if (!JAMENDO_CLIENT_ID) {
                const isProd = import.meta.env.PROD;
                setError(isProd
                    ? 'API Key no configurada. Verifica los Secrets de GitHub (PUBLIC_JAMENDO_CLIENT_ID) y que la Action haya terminado de compilar.'
                    : 'API Key no configurada en el archivo .env local.');
                setIsLoading(false);
                return;
            }

            try {
                const params = new URLSearchParams({
                    client_id: JAMENDO_CLIENT_ID,
                    format: 'json',
                    limit: '15',
                    tags: tag,
                    audioformat: 'mp32',
                    order: 'popularity_total',
                });

                const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${params}`);
                const data = await response.json();

                if (data.headers?.status === 'failed') {
                    setError(`Error de Jamendo: ${data.headers.error_message || 'API Key inválida'}`);
                } else {
                    setTracks(data.results || []);
                }
            } catch (err) {
                setError('Error de conexión con Jamendo');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTracks();
    }, [tag]);

    const handlePlay = (track: JamendoTrack, index: number) => {
        // Convert all tracks to player format
        const songs = tracks.map(t => ({
            id: t.id,
            title: t.name,
            artists: [t.artist_name],
            album: t.album_name,
            image: t.image,
            duration: formatDuration(t.duration),
            audioUrl: t.audio
        }));

        usePlayerStore.setState({
            currentMusic: {
                playlist: { id: tag, title },
                song: songs[index],
                songs: songs,
                currentIndex: index
            },
            isPlaying: true
        });
    };

    const handlePlayAll = () => {
        if (tracks.length > 0) {
            handlePlay(tracks[0], 0);
        }
    };

    // Calculate total duration
    const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0);
    const totalMins = Math.floor(totalDuration / 60);

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <span className="animate-pulse text-text-muted">Cargando playlist...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="inline-block p-4 border border-accent-pink/30 bg-accent-pink/10 rounded-lg">
                    <p className="text-accent-pink font-medium mb-2">⚠️ Error de Configuración</p>
                    <p className="text-sm text-text-muted max-w-md mx-auto">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="jamendo-playlist">
            {/* Playlist Header */}
            <header className="flex flex-row gap-6 mb-8">
                <div
                    className="w-48 h-48 rounded-lg flex items-center justify-center text-6xl shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}10)` }}
                >
                    {tag === 'metal' && '🎸'}
                    {tag === 'rock' && '🔥'}
                    {tag === 'hiphop' && '🎤'}
                    {tag === 'electronic' && '🎧'}
                    {tag === 'jazz' && '🎷'}
                    {tag === 'classical' && '🎻'}
                </div>

                <div className="flex flex-col justify-end">
                    <span className="text-xs uppercase tracking-wide text-text-muted mb-2">Playlist Jamendo</span>
                    <h1 className="text-5xl font-display font-bold text-text-bright mb-2">{title}</h1>
                    <p className="text-text-muted mb-4">{description}</p>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>{tracks.length} canciones</span>
                        <span>•</span>
                        <span>{totalMins} min</span>
                    </div>
                </div>
            </header>

            {/* Play Button */}
            <div className="mb-6">
                <button
                    onClick={handlePlayAll}
                    className="px-8 py-3 rounded-full font-semibold text-void transition-all hover:scale-105"
                    style={{ background: accentColor }}
                >
                    ▶ Reproducir
                </button>
            </div>

            {/* Track List */}
            <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-2 text-xs text-text-muted uppercase tracking-wide border-b border-surface-lighter/30">
                    <span className="w-8">#</span>
                    <span className="w-12"></span>
                    <span className="flex-1">Título</span>
                    <span className="w-48 hidden md:block">Álbum</span>
                    <span className="w-16 text-right">Duración</span>
                </div>

                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        onClick={() => handlePlay(track, index)}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-surface-light/50 group transition-colors cursor-pointer border border-transparent hover:border-accent-cyan/20"
                    >
                        <span className="text-text-muted text-sm w-8 font-mono group-hover:hidden">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="hidden group-hover:block w-8 text-accent-cyan">▶</span>

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
                    </div>
                ))}
            </div>

            {/* Attribution */}
            <div className="mt-8 pt-4 border-t border-surface-lighter/20">
                <p className="text-xs text-text-muted">
                    Música proporcionada por{' '}
                    <a
                        href="https://www.jamendo.com"
                        target="_blank"
                        rel="noopener"
                        className="text-accent-cyan hover:underline"
                    >
                        Jamendo
                    </a>
                    {' '}• Creative Commons
                </p>
            </div>
        </div>
    );
}
