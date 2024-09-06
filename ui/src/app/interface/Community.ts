import { User } from "./User";

export interface Community {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
}
