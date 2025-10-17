import { VisualStyle, StyleInfo } from './types';

export const VISUAL_STYLES: StyleInfo[] = [
  {
    id: VisualStyle.CINEMATIC,
    name: 'Cinematic',
    description: 'Moody lighting, shallow depth of field, and film grain for a dramatic feel.',
    imageUrl: 'https://picsum.photos/seed/cinematic/400/300',
  },
  {
    id: VisualStyle.ANIME,
    name: 'Anime',
    description: 'Dynamic action, vibrant colors, and stylized cell-shading for an animated look.',
    imageUrl: 'https://picsum.photos/seed/anime/400/300',
  },
  {
    id: VisualStyle.RETRO,
    name: 'Retro',
    description: 'VHS effects, neon glows, and a vintage color palette for a nostalgic vibe.',
    imageUrl: 'https://picsum.photos/seed/retro/400/300',
  },
  {
    id: VisualStyle.ABSTRACT,
    name: 'Abstract',
    description: 'Geometric shapes, flowing colors, and surreal landscapes synched to the music.',
    imageUrl: 'https://picsum.photos/seed/abstract/400/300',
  },
  {
    id: VisualStyle.LYRIC,
    name: 'Lyric Video',
    description: 'Focus on kinetic typography and creative text animations that tell the story.',
    imageUrl: 'https://picsum.photos/seed/lyric/400/300',
  },
];
