export interface IReportBike {
    fullName: string;
    licenseNumber: string;
    color: string;
    type: string;
    date: Date;
    description: string;
    policeOfficerId?: number;
}

export interface ISearchBike {
    isResolved?: boolean;
    fullName?: string;
    licenseNumber?: string;
    color?: string;
    type?: string;
    date?: Date;
    description?: string;
    policeOfficerId?: number;
}
