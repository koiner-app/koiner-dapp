import { KoinerChainRenderers } from '@koiner/chain/renderers';
import { KoinerContractRenderers } from '@koiner/contract/renderers';
import { KoinerTokenizeRenderers } from '@koiner/tokenize/renderers';

export const KoinerRenderers = [
  ...KoinerChainRenderers,
  ...KoinerContractRenderers,
  ...KoinerTokenizeRenderers,
];
