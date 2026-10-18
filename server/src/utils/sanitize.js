/**
 * Strips HTML tags and normalizes whitespace to enforce pure plain-text user inputs
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[\r\n\t]+/g, ' ') // normalize whitespace/newlines
    .trim();
};

export const sanitizeMultilineText = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .trim();
};

