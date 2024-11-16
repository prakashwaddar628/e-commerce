export const truncateText = (str: string, length: number = 25) => {
    if (str.length <= length) return str;
    const truncated = str.substring(0, length);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    return str.substring(0, lastSpaceIndex) + '...';
  };
  