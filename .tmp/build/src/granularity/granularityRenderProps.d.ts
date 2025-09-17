import { Selection } from "d3-selection";
import { GranularityType } from "./granularityType";
import { GranularitySettingsCard } from "../timeLineSettingsModel";
export interface IGranularityRenderProps {
    selection: Selection<any, any, any, any>;
    granularSettings: GranularitySettingsCard;
    selectPeriodCallback: (granularityType: GranularityType) => void;
}
