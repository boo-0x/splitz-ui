export interface Payee {
    address: string;
    shares: number;
    sharesPercentage?: number;
    addressError?: boolean;
    sharesError?: boolean;
}
