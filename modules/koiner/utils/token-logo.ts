export function tokenLogo(id: string, symbol: string): string {
  let imageName = id;
  let ext = 'png';

  if (symbol === 'koindx-lp') {
    imageName = 'koindx';
  }

  if (['koindx-lp', 'koindx', 'koin', 'vapor'].includes(symbol)) {
    ext = 'svg';
  }

  return `/tokens/${imageName}.${ext}`;
}

// tokenLogo: (symbol: string): string => {
//         const logos: Record<string, string> = {
//           anons: 'anons.jpg',
//           btk: 'bitkoin.png',
//           drugs: 'drugs.png',
//           dgk: 'dogekoin.png',
//           eth: 'eth.png',
//           egg: 'egg.png',
//           mars: 'elonkoin.jpg',
//           fr: 'frenchie.png',
//           jesus: 'jesus.jpg',
//           gold: 'gold.png',
//           kan: 'kan.png',
//           kdbln: 'kdbln.png',
//           kct: 'kct.png',
//           koin: 'koin.svg',
//           koindx: 'koindx.svg',
//           'koindx-lp': 'koindx.svg',
//           punksk: 'punksk.png',
//           meow: 'meow.jpg',
//           mk: 'mk.png',
//           noik: 'noik.jpg',
//           ogas: 'ogas.png',
//           pvhp: 'pvhp.png',
//           rad: 'rad.png',
//           rwa: 'rwa.jpg',
//           shit: 'shit.jpg',
//           tate: 'tate.png',
//           up: 'up.png',
//           usdt: 'usdt.png',
//           vapor: 'vapor.svg',
//           vhp: 'vhp.png',
//         };
//
//         return logos[symbol.toLowerCase()] ?? null;
//       },
