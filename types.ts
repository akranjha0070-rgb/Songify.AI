export enum AppStep {
  UPLOAD,
  STYLE,
  PROGRESS,
  RESULT,
}

export enum VisualStyle {
  CINEMATIC = 'CINEMATIC',
  ANIME = 'ANIME',
  RETRO = 'RETRO',
  ABSTRACT = 'ABSTRACT',
  LYRIC = 'LYRIC_VIDEO',
}

export interface StyleInfo {
  id: VisualStyle;
  name: string;
  description: string;
  imageUrl: string;
}
