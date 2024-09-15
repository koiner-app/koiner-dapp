import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import TokenAttributeRenderer from './token-attribute-renderer.vue';
import TokenContractNameAttributeRenderer from './token-contract-name-attribute-renderer.vue';
import TokenAmountAttributeRenderer from './token-amount-attribute-renderer.vue';
import KoinTokenAmountAttributeRenderer from './koin-token-amount-attribute-renderer.vue';
import ManaTokenAmountAttributeRenderer from './mana-token-amount-attribute-renderer.vue';
import VhpTokenAmountAttributeRenderer from './vhp-token-amount-attribute-renderer.vue';
import TokenImageAttributeRenderer from './token-image-attribute-renderer.vue';
import TradeTokenAttributeRenderer from './trade-token-attribute-renderer.vue';
import {
  isNumericAttributeControl,
  isStringAttributeControl,
} from '@appvise/jsonsearch-quasar';

const tokenAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'token'))
  ),
};

const tokenNameAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenContractNameAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'tokenContractName'))
  ),
};

const tokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'tokenAmount'))
  ),
};

const koinTokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: KoinTokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'koinTokenAmount'))
  ),
};

const manaTokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ManaTokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'manaTokenAmount'))
  ),
};

const vhpTokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: VhpTokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'vhpTokenAmount'))
  ),
};

const tokenImageAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenImageAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'tokenImage'))
  ),
};

const tradeTokenAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TradeTokenAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'tradeToken'))
  ),
};

export {
  TokenAttributeRenderer,
  TokenContractNameAttributeRenderer,
  TokenAmountAttributeRenderer,
  KoinTokenAmountAttributeRenderer,
  ManaTokenAmountAttributeRenderer,
  VhpTokenAmountAttributeRenderer,
  TokenImageAttributeRenderer,
};

export const contractAttributeRenderers = [
  tokenAttributeRendererEntry,
  tokenNameAttributeRendererEntry,
  tokenAmountAttributeRendererEntry,
  koinTokenAmountAttributeRendererEntry,
  manaTokenAmountAttributeRendererEntry,
  vhpTokenAmountAttributeRendererEntry,
  tokenImageAttributeRendererEntry,
  tradeTokenAttributeRendererEntry,
];
