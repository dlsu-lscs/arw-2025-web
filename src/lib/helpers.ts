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
  }
};

export const returnColorFromCluster70 = (cluster: string) => {
  switch (cluster) {
    case 'all':
      return '#2563EBB3';
    case 'engage':
      return '#010F56B3';
    case 'cap13':
      return '#564C01B3';
    case 'aspire':
      return '#8D0094B3';
    case 'probe':
      return '#940000B3';
    case 'aso':
      return '#3FA300B3';
  }
};
