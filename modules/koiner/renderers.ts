import { KoinerAttributeRenderers } from '@koiner/components/search/attribute';
import { KoinerChainRenderers } from '@koiner/chain/components/renderers';
import { KoinerContractRenderers } from '@koiner/contracts/components/renderers';
import { KoinerNetworkRenderers } from '@koiner/network/components/renderers';
import { KoinerTokenizeRenderers } from '@koiner/tokenize/components/renderers';

export const KoinerRenderers = [
  ...KoinerAttributeRenderers,
  ...KoinerChainRenderers,
  ...KoinerContractRenderers,
  ...KoinerNetworkRenderers,
  ...KoinerTokenizeRenderers,
];
