import { TokenContract } from './token-contract';

export interface TokenBalance {
  addressId: string;
  balance: number;
  contract?: TokenContract;
}
