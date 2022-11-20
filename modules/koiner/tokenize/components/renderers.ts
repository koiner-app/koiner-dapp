import { contractAttributeRenderers } from './contract/search/attribute';
import { contractEventAttributeRenderers } from './event/search/attribute';

export const KoinerTokenizeRenderers = [
  ...contractAttributeRenderers,
  ...contractEventAttributeRenderers,
];
