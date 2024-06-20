export interface TimelineItemProps {
  type: 'picture' | 'video' | 'caption';
  date: string;
  src?: string;
  caption?: string;
  text?: string;
}

export interface PictureItemProps {
  src: string;
  caption?: string;
}

export interface VideoItemProps {
  src: string;
  caption?: string;
}

export interface CaptionItemProps {
  text: string;
}
