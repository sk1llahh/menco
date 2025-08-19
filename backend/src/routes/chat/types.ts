export type ChatType = 'DIRECT' | 'GROUP';
export type MessageType = 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';

export interface ChatCreateBody {
  type?: ChatType;
  title?: string;
  memberIds?: string[];
}

export interface SendMessageBody {
  type?: MessageType;
  content: string;
}
