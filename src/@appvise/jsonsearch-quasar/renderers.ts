import { attributeRenderers } from './attributes';
import { viewRenderers } from './views';

export const jsonSearchRenderers = [...attributeRenderers, ...viewRenderers];
