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
