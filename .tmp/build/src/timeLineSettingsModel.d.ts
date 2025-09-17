import powerbi from "powerbi-visuals-api";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import Card = formattingSettings.SimpleCard;
import CompositeCard = formattingSettings.CompositeCard;
import Model = formattingSettings.Model;
import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
declare class CursorSettingsCard extends Card {
    show: formattingSettings.ToggleSwitch;
    color: formattingSettings.ColorPicker;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: formattingSettings.ColorPicker[];
}
declare class ForceSelectionSettingsCard extends Card {
    currentPeriod: formattingSettings.ToggleSwitch;
    latestAvailableDate: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: formattingSettings.ToggleSwitch[];
}
export declare class WeeksDeterminationStandardsSettingsCard extends Card {
    weekStandard: formattingSettings.ItemDropdown;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: formattingSettings.ItemDropdown[];
}
export declare class CalendarSettingsCard extends Card {
    static readonly DefaultMonth: number;
    static readonly DefaultDay: number;
    month: formattingSettings.ItemDropdown;
    day: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: (formattingSettings.ItemDropdown | formattingSettings.NumUpDown)[];
}
declare class WeekDaySettingsCard extends Card {
    daySelection: formattingSettings.ToggleSwitch;
    day: formattingSettings.ItemDropdown;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: formattingSettings.ItemDropdown[];
}
export declare class RangeHeaderSettingsCard extends Card {
    show: formattingSettings.ToggleSwitch;
    fontColor: formattingSettings.ColorPicker;
    textSize: formattingSettings.NumUpDown;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: (formattingSettings.ColorPicker | formattingSettings.NumUpDown)[];
}
export declare class CellsSettingsCard extends Card {
    static readonly FillSelectedDefaultColor: string;
    static readonly FillUnselectedDefaultColor: string;
    fillSelected: formattingSettings.ColorPicker;
    strokeSelected: formattingSettings.ColorPicker;
    fillUnselected: formattingSettings.ColorPicker;
    strokeUnselected: formattingSettings.ColorPicker;
    strokeWidth: formattingSettings.NumUpDown;
    gapWidth: formattingSettings.NumUpDown;
    enableManualSizing: formattingSettings.ToggleSwitch;
    width: formattingSettings.NumUpDown;
    height: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: (formattingSettings.ColorPicker | formattingSettings.ToggleSwitch | formattingSettings.NumUpDown)[];
}
export declare class GranularitySettingsCard extends Card {
    show: formattingSettings.ToggleSwitch;
    scaleColor: formattingSettings.ColorPicker;
    sliderColor: formattingSettings.ColorPicker;
    granularity: formattingSettings.ItemDropdown;
    granularityYearVisibility: formattingSettings.ToggleSwitch;
    granularityQuarterVisibility: formattingSettings.ToggleSwitch;
    granularityMonthVisibility: formattingSettings.ToggleSwitch;
    granularityWeekVisibility: formattingSettings.ToggleSwitch;
    granularityDayVisibility: formattingSettings.ToggleSwitch;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: (formattingSettings.ColorPicker | formattingSettings.ToggleSwitch | formattingSettings.ItemDropdown)[];
}
export declare class LabelsSettingsCard extends Card {
    show: formattingSettings.ToggleSwitch;
    displayAll: formattingSettings.ToggleSwitch;
    fontColor: formattingSettings.ColorPicker;
    textSize: formattingSettings.NumUpDown;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
    slices: (formattingSettings.ColorPicker | formattingSettings.ToggleSwitch | formattingSettings.NumUpDown)[];
}
declare class ScrollAutoAdjustmentSettingsCard extends Card {
    show: formattingSettings.ToggleSwitch;
    topLevelSlice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    displayNameKey: string;
}
export declare class TimeLineSettingsModel extends Model {
    cursor: CursorSettingsCard;
    forceSelection: ForceSelectionSettingsCard;
    weekDay: WeekDaySettingsCard;
    weeksDeterminationStandards: WeeksDeterminationStandardsSettingsCard;
    calendar: CalendarSettingsCard;
    rangeHeader: RangeHeaderSettingsCard;
    cells: CellsSettingsCard;
    granularity: GranularitySettingsCard;
    labels: LabelsSettingsCard;
    scrollAutoAdjustment: ScrollAutoAdjustmentSettingsCard;
    cards: Array<Card | CompositeCard>;
    setLocalizedOptions(localizationManager: ILocalizationManager): void;
    private setLocalizedDisplayName;
}
export {};
