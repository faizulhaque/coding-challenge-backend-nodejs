export enum Status {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAIL = 'fail',
    REJECTED = 'rejected'
}

export enum Type {
    REDIRECT = 'redirect',
    VOID = 'void',
    AUTHORIZE = 'authorize',
    REFUND = 'refund',
    CAPTURE = 'capture',
    CHECK = 'check',
    CHARGE = 'charge'
}
