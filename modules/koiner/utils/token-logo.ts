export function tokenLogo(id: string, symbol: string): string {
  let imageName = id;
  let ext = 'png';

  if (symbol.toLowerCase() === 'koindx-lp') {
    imageName = 'koindx';
  }

  if (['koindx-lp', 'koindx', 'koin', 'vapor'].includes(symbol.toLowerCase())) {
    ext = 'svg';
  }

  return `/tokens/${imageName}.${ext}`;
}
