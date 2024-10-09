import { IUser } from "./user";

export interface ICustomer {
  userId: IUser;
  city?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
}
