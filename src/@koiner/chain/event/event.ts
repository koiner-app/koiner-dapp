export interface Event {
  transactionId: string;
  sequence: number;
  contractId?: string;
  name: string;
  data: string;
  impacted?: string[];
}
