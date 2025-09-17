import { GranularityType } from "./granularityType";
export interface IGranularityName {
    granularityType: GranularityType;
    name: string;
    nameKey: string;
    marker: string;
}
