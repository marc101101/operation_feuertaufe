export interface Payload {}

export class DataToS3 {
    provider: string;
    meta?: string[];
    timestamp: string;
    filename: string;
    payload?: Payload;
}
