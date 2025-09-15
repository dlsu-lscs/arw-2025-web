export const returnColorFromCluster = (cluster: string) => {
  switch (cluster) {
    case 'all':
      return '#2563EB';
    case 'engage':
      return '#010F56';
    case 'cap13':
      return '#564C01';
    case 'aspire':
      return '#8D0094';
    case 'probe':
      return '#940000';
    case 'aso':
      return '#3FA300';
    case 'cso':
      return '#004B02';
    case 'special':
      return '#0078A3';
  }
};

export const returnColorFromCluster62 = (cluster: string) => {
  switch (cluster) {
    case 'all':
      return '#2563EB9E';
    case 'engage':
      return '#010F569E';
    case 'cap13':
      return '#564C019E';
    case 'aspire':
      return '#8D00949E';
    case 'probe':
      return '#9400009E';
    case 'aso':
      return '#3FA3009E';
    case 'cso':
      return '#004B029E';
    case 'special':
      return '#0078A39E';
  }
};

export const getYoutubeEmbedUrl = (videoUrl: string): string => {
  if (!videoUrl) {
    return '';
  }

  // Regular expressions to match different YouTube URL formats
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = videoUrl.match(regExp);

  // If a match is found, extract the video ID and return the embed URL
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return '';
};
