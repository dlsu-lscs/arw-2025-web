export const returnColorFromCluster = (cluster: string) => {
  switch (cluster) {
    case 'engage':
      return 'bg-[#010F56]/70';
    case 'cap13':
      return 'bg-[#564C01]/70';
    case 'aspire':
      return 'bg-[#8D0094]/70';
    case 'probe':
      return 'bg-[#940000]/70';
    case 'aso':
      return 'bg-[#3FA300]/70';
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
