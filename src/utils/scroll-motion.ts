/** Pure helpers for the scroll-linked three-chapter service experience. */
export function getStoryProgress(sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  const scrollRange = Math.max(sectionHeight - viewportHeight, 1);
  return Math.min(1, Math.max(0, -sectionTop / scrollRange));
}

export function getStoryStage(progress: number): number {
  return Math.min(2, Math.floor(Math.min(1, Math.max(0, progress)) * 3));
}

export function getStoryOpacities(progress: number): [number, number, number] {
  const position = Math.min(2, Math.max(0, progress * 2));
  return [
    Math.max(0, 1 - position),
    Math.max(0, 1 - Math.abs(position - 1)),
    Math.max(0, position - 1),
  ];
}
