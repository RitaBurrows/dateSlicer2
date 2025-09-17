import { CssConstants } from "powerbi-visuals-utils-svgutils";
import { IFilterColumnTarget } from "powerbi-models";
import { ITimelineDatePeriod } from "./datePeriod/datePeriod";
import { IGranularity } from "./granularity/granularity";
export interface ITimelineMargins {
    LeftMargin: number;
    RightMargin: number;
    TopMargin: number;
    BottomMargin: number;
    CellWidth: number;
    CellHeight: number;
    StartXpoint: number;
    StartYpoint: number;
    ElementWidth: number;
    MinCellWidth: number;
    MinCellHeight: number;
    MaxCellHeight: number;
    PeriodSlicerRectWidth: number;
    PeriodSlicerRectHeight: number;
    LegendHeight: number;
    FramePadding: number;
    LegendHeightRange: number;
    HeightOffset: number;
}
export interface ITimelineSelectors {
    Cell: CssConstants.ClassAndSelector;
    CellRect: CssConstants.ClassAndSelector;
    CellsArea: CssConstants.ClassAndSelector;
    CursorsArea: CssConstants.ClassAndSelector;
    LowerTextArea: CssConstants.ClassAndSelector;
    LowerTextCell: CssConstants.ClassAndSelector;
    MainArea: CssConstants.ClassAndSelector;
    PeriodSlicerGranularities: CssConstants.ClassAndSelector;
    PeriodSlicerRect: CssConstants.ClassAndSelector;
    PeriodSlicerSelection: CssConstants.ClassAndSelector;
    PeriodSlicerSelectionRect: CssConstants.ClassAndSelector;
    RangeTextArea: CssConstants.ClassAndSelector;
    SelectionCursor: CssConstants.ClassAndSelector;
    SelectionRangeContainer: CssConstants.ClassAndSelector;
    TextLabel: CssConstants.ClassAndSelector;
    TimelineSlicer: CssConstants.ClassAndSelector;
    TimelineVisual: CssConstants.ClassAndSelector;
    TimelineWrapper: CssConstants.ClassAndSelector;
    UpperTextArea: CssConstants.ClassAndSelector;
    UpperTextCell: CssConstants.ClassAndSelector;
}
export interface ITimelineLabel {
    title: string;
    text: string;
    id: number;
}
export interface IExtendedLabel {
    yearLabels?: ITimelineLabel[];
    quarterLabels?: ITimelineLabel[];
    monthLabels?: ITimelineLabel[];
    weekLabels?: ITimelineLabel[];
    dayLabels?: ITimelineLabel[];
}
export interface ITimelineJSONDatePeriod {
    startDate: string;
    endDate: string;
}
export interface ITimelineCursorOverElement {
    index: number;
    datapoint: ITimelineDataPoint;
}
export interface ITimelineProperties {
    leftMargin: number;
    rightMargin: number;
    topMargin: number;
    bottomMargin: number;
    textYPosition: number;
    startXpoint: number;
    startYpoint: number;
    elementWidth: number;
    cellWidth: number;
    cellHeight: number;
    cellsYPosition: number;
    legendHeight: number;
}
export interface ITimelineData {
    filterColumnTarget?: IFilterColumnTarget;
    timelineDataPoints?: ITimelineDataPoint[];
    selectionStartIndex?: number;
    selectionEndIndex?: number;
    cursorDataPoints?: ICursorDataPoint[];
    currentGranularity?: IGranularity;
}
export interface ICursorDataPoint {
    x: number;
    y: number;
    cursorIndex: number;
    selectionIndex: number;
}
export interface ITimelineDataPoint {
    index: number;
    datePeriod: ITimelineDatePeriod;
}
