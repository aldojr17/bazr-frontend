export interface IChat {
  user_id: number;
  text: string;
}

export interface IChatboxProps {
  hostId: number;
  visitorName: string;
  refundId: number;
  chats: IChat[];
  lastUpdated: string;
}

export interface IChatboxHeaderProps {
  visitorProfilePicture: string;
  visitorName: string;
  lastUpdated: string;
}

export interface IChatBubbleProps {
  profilePicture: string;
  message: string;
}
