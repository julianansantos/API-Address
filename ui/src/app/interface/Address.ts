import { User } from "@app/interface/User";

export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    complement: string;
    number: number;
    communities: Community[];
}

export interface Community {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
}