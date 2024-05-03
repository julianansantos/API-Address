export interface AddressForm {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    complement?: string | null;
    number?: number | null;
}
