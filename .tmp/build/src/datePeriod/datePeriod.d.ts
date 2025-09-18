export interface ITimelineDatePeriodBase {
    endDate: Date;
    startDate: Date;
}
export interface ITimelineDatePeriod extends ITimelineDatePeriodBase {
    fraction: number;
    identifierArray: (string | number)[];
    index: number;
    week: number[];
    year: number;
}
