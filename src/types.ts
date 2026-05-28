export interface RSVPReply {
  id: string;
  name: string;
  isAttending: 'yes' | 'no' | 'maybe';
  guestsCount: number;
  beverages: string[];
  comment?: string;
  submittedAt: string;
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
  description: string;
  isPrimary?: boolean;
}
