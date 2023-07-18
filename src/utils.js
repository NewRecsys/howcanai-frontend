export function makeTruncatedText(text) {
  const maxLength = 20;
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + ' ...';
  }
  return text;
}


