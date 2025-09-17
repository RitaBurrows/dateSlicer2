import { Selection } from "d3-selection";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";
import { IExtendedLabel, ITimelineLabel } from "../dataInterfaces";
export interface IGranularity {
    getType?(): GranularityType;
    splitDate(date: Date): (string | number)[];
    getDatePeriods(): ITimelineDatePeriod[];
    resetDatePeriods(): void;
    getExtendedLabel(): IExtendedLabel;
    setExtendedLabel(extendedLabel: IExtendedLabel): void;
    createLabels(granularity: IGranularity): ITimelineLabel[];
    sameLabel?(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean;
    generateLabel?(datePeriod: ITimelineDatePeriod): ITimelineLabel;
    addDate(date: Date): any;
    setNewEndDate(date: Date): void;
    splitPeriod(index: number, newFraction: number, newDate: Date): void;
    splitDateForTitle(date: Date): (string | number)[];
    render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any>;
}
