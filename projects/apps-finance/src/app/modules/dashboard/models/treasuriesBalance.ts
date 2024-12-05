export interface TreasuriesAccount {
  currentBalance: number;
  treasuryCode: string;
  treasuryName: string;
}

export interface TreasuriesBalance {
  totalBalance: number;
  treasuries: TreasuriesAccount[];
}
