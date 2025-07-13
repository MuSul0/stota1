export const sanitizeFilename = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getUniqueDbTitle = (displayTitle: string, pageCtx: string, mediaType: 'image' | 'video'): string => {
  const sanitizedPageContext = sanitizeFilename(pageCtx);
  const sanitizedDisplayTitle = sanitizeFilename(displayTitle);
  return `${sanitizedPageContext}-${sanitizedDisplayTitle}-${mediaType}`;
};