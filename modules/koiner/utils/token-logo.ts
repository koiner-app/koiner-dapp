export function tokenLogo(id: string, symbol: string): string | undefined {
  // Check if image is supported for token
  if (
    symbol.toLowerCase() !== 'koindx-lp' &&
    ![
      '1A7ix1dr77wUVD3XtCwbthbysT5LeB1CeG',
      '1AFMFjbSzpnK58xbwt6cyAnhLF77qm5FeC',
      '1BPCnqT5f586ZMMNJGEVMZqjaT3uq9UJef',
      '1BTQCpospHJRA7VAtZ4wvitdcqYCvkwBCD',
      '1C4pGZS9oBBLs4vCTehGNBa7StXqYFRc16',
      '1CJrcYSoQrbhLn6YBEtoRrnF5wCu9EDGWh',
      '1Ebofi5eanmof6zSchTqtV2t2dMut7fhMq',
      '1EoGf6wPB632JudW1P12aSByLJdeNajWoU',
      '1F81UPvBW4g2jFLU5VuBvoPeZFFHL5fPqQ',
      '1GxUYvtvfg6h3JfPGt333K8choowzWRabD',
      '1H1tWd95HvL2wT25qpXrVMosGdGUNPRFiA',
      '1HMmpaijocfMvTXDZ6hchQdqDfg2YoFdca',
      '1KroK111wVj8QU3ydFHqPpNyVtfgV8n755',
      '1KU6cUY3TwYQzTRHakUcviiYmxNepRKkhQ',
      '1KvmbzB8zjsq62j93P1tSdeEaKbFN2tQfe',
      '1Lbv5XiY8KuHuaAf98quH7mF6s8JhJqU1u',
      '1LeWGhDVD8g5rGCL4aDegEf9fKyTL1KhsS',
      '1MgxkRTXLav3Neq8CCiDnq9wFfhshERh9b',
      '1MKZL78P9yiMUw6QyeDojjok5s4YwBz7Qf',
      '1MMrHqnC1fXHg6z2jYPz9j4shHZotgtqrD',
      '1NHReq2apWsQ6UPBjNqcV3ABsj88Ncimiy',
      '1Q9o3uTa6L9XMFeUM5yfZyYuyGxn1ai2gx',
      '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
      '15VPnHQgm9yTWGuxCmfsPABJYnDNFymkTM',
      '15YQgWLr1oNyT6PP2HtDMvku3A23UMMKrR',
      '17t977jJZ7DYKPQsjqtStbpvmde1DditXW',
      '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
      '19gboDCAUprvxpmyic71Mka5EfWGeCKa6K',
      '19WrWze3XAoMa3Mwqys4rJMP6emZX2wfpH',
      '143CLkKmfqa6trCbjxDMKojjeLq2q4RGD8',
      '189TkvhzpeRg56EnhysLa5YP9ufvaXTcWn',
      '19bbwAGVQLsTmTSoWanmrQ4w4VfyB8cwwK',
      '1GNkfsZp9ySg314QFVZAAew1VDbjGNZrZP',
      '13LSVn3ieYBrKntQbir45hyEXQDSDPPHrQ',
      '1Bq1bNY3AzoNZucxwEb45cmRCBWYgZbS8N',
      '1HpuQRLCaastcS4UDgbK6obwDyqxnrdsn',
      '1KRnT95gSFLox2arT5bAu5GaL5waQBWT4W',
      '156h8x3tqjzsXQX6XXf7h6AuXQifMkC6Em',
      '1EPvYm5K73xVGFh9qwwHQqYt94HGCJj8bc',
    ].includes(id)
  ) {
    return;
  }

  let imageName = id;
  let ext = 'png';

  if (symbol.toLowerCase() === 'koindx-lp') {
    imageName = 'koindx';
  }

  if (['koindx-lp', 'koindx', 'koin', 'vapor'].includes(symbol.toLowerCase())) {
    ext = 'svg';
  }

  return `/token-logos/${imageName}.${ext}`;
}
