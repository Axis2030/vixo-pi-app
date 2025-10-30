export enum MembershipClassType {
  CASUAL = "casual",
    PREMIUM = "premium",
    CREATOR = "creator",
}

export interface IUser {
  id: string;
  username: string;
  displayName ? : string;
  avatarUrl ? : string;
  walletAddress ? : string;
  membershipClass ? : MembershipClassType;
  createdAt ? : string;
}