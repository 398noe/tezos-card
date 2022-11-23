export interface TCard {
    name: string, // string, but it starts with "0x..."
    color: number, // you can set number for 24bit bytes
    domain: string,
    email: string,
    handle_name: string,
    sns: {
        [key: string]: string
    }
}