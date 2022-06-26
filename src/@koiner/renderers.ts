import { KoinerChainRenderers } from '@koiner/chain/renderers';
import { KoinerContractRenderers } from '@koiner/contract/renderers';

export const KoinerRenderers = [
  ...KoinerChainRenderers,
  ...KoinerContractRenderers,
];
