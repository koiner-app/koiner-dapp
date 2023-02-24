import { addressAttributeRenderers } from './address/search/attribute';
import { transactionAttributeRenderers } from './transaction/search/attribute';

export const KoinerChainRenderers = [
  ...addressAttributeRenderers,
  ...transactionAttributeRenderers,
];
