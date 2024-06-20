// components/Home/Board/types.ts
export interface Track {
  title: string;
  artist: string;
  albumArt: string;
  progress: number;
}

export interface Note {
  title: string;
  content: string | string[];
}

export interface MusicCardProps {
  track: Track;
}

export interface NotesCardProps {
  notes: Note[];
}

export interface LetterMapCardProps {
  letter: string | null;
  onSendLetter: () => void;
  onRequestLocation: () => void;
}

export interface BoardProps {
}

export interface SwipeProps {
  pages: React.ReactNode[];
  pageWidth: number;
}
