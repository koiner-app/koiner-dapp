import { round } from 'lodash';

export function tokenAmount(units: number, decimals: number): number {
  return round(units / Math.pow(10, decimals), decimals);
}

export function formattedTokenAmount(
  units: number,
  decimals: number,
  displayedDecimals?: number
): string {
  return tokenAmount(units, decimals).toFixed(displayedDecimals ?? decimals);
}
