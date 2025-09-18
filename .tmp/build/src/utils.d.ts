import { ITimelineDatePeriod, ITimelineDatePeriodBase } from "./datePeriod/datePeriod";
import { ITimelineData, ITimelineDataPoint } from "./dataInterfaces";
import { IGranularityName } from "./granularity/granularityName";
import { GranularityType } from "./granularity/granularityType";
import { CellsSettingsCard } from "./timeLineSettingsModel";
export declare class Utils {
    static DefaultCellColor: string;
    static TotalMilliseconds: number;
    static TotalSeconds: number;
    static TotalMinutes: number;
    static TotalHours: number;
    static normaliseDate(date: Date): Date;
    static getFirstDayOfMonth(year: number, month: number): number;
    static getNumberofDaysInCurrMonth(year: number, month: number): number;
    static getNumberofDaysInPrevMonth(year: number, month: number): number;
    static CONVERT_TO_DAYS_FROM_MILLISECONDS(milliseconds: number): number;
    static GET_NUMBER_OF_DAYS_BETWEEN_DATES(startDate: Date, endDate: Date): number;
    static GET_NUMBER_OF_WEEKS_BETWEEN_DATES(startDate: Date, endDate: Date): number;
    static GET_MILLISECONDS_WITHOUT_TIMEZONE(date: Date): number;
    static GET_DATE_WITHOUT_TIMEZONE(date: Date): Date;
    static GET_DAYLIGHT_SAVING_TIME_OFF(startDate: Date, endDate: Date): number;
    static TO_STRING_DATE_WITHOUT_TIMEZONE(date: Date): string | null;
    static GET_END_OF_THE_PREVIOUS_DATE(date: Date): Date;
    static PARSE_DATE_WITHOUT_TIMEZONE(dateString: string): Date | null;
    static RESET_TIME(date: Date): Date;
    static GET_DATE_PERIOD(values: any[] | null): ITimelineDatePeriodBase;
    static PARSE_DATE(value: any): Date | undefined;
    static ARE_BOUNDS_OF_SELECTION_AND_AVAILABLE_DATES_THE_SAME(timelineData: ITimelineData): boolean | undefined;
    static GET_THE_LATEST_DAY_OF_MONTH(monthId: number): number;
    static IS_VALUE_EMPTY(value: any): boolean;
    /**
     * Returns the date of the start of the selection
     * @param timelineData The TimelineData which contains all the date periods
     */
    static GET_START_SELECTION_DATE(timelineData: ITimelineData): Date | undefined;
    /**
     * Returns the date of the end of the selection
     * @param timelineData The TimelineData which contains all the date periods
     */
    static GET_END_SELECTION_DATE(timelineData: ITimelineData): Date | undefined;
    /**
     * Returns the date period of the end of the selection
     * @param timelineData The TimelineData which contains all the date periods
     */
    static GET_END_SELECTION_PERIOD(timelineData: ITimelineData): ITimelineDatePeriod | undefined;
    /**
     * Returns the color of a cell, depending on whether its date period is between the selected date periods.
     * CellRects should be transparent filled by default if there isn't any color sets.
     * @param d The TimelineDataPoint of the cell
     * @param timelineData The TimelineData with the selected date periods
     * @param timelineFormat The TimelineFormat with the chosen colors
     */
    static GET_CELL_COLOR(dataPoint: ITimelineDataPoint, timelineData: ITimelineData, cellSettings: CellsSettingsCard): string;
    static IS_GRANULE_SELECTED(dataPoint: ITimelineDataPoint, timelineData: ITimelineData): boolean;
    /**
     * Returns the granularity type of the given granularity name
     * @param granularityName The name of the granularity
     */
    static GET_GRANULARITY_TYPE(granularityName: string): GranularityType;
    static GET_GRANULARITY_PROPS_BY_MARKER(marker: string): IGranularityName;
    /**
     * Returns the name of the granularity type
     * @param granularityType The type of granularity
     */
    static GET_GRANULARITY_NAME_KEY(granularityType: GranularityType): string;
    /**
     * Splits the date periods of the current granularity, in case the start and end of the selection is in between a date period.
     * i.e. for a quarter granularity and a selection between Feb 6 and Dec 23, the date periods for Q1 and Q4 will be split accordingly
     * @param timelineData The TimelineData that contains the date periods
     * @param startDate The starting date of the selection
     * @param endDate The ending date of the selection
     */
    static SEPARATE_SELECTION(timelineData: ITimelineData, startDate: Date, endDate: Date): void;
    /**
     * Returns the ratio of the given date compared to the whole date period.
     * The ratio is calculated either from the start or the end of the date period.
     * i.e. the ratio of Feb 7 2016 compared to the month of Feb 2016,
     * is 0.2142 from the start of the month, or 0.7857 from the end of the month.
     * @param datePeriod The date period that contain the specified date
     * @param date The date
     * @param fromStart Whether to calculater the ratio from the start of the date period.
     */
    static GET_DATE_RATIO(datePeriod: ITimelineDatePeriod, date: Date, fromStart: boolean): number;
    /**
     * Returns the time range text, depending on the given granularity (e.g. "Feb 3 2014 - Apr 5 2015", "Q1 2014 - Q2 2015")
     */
    static TIME_RANGE_TEXT(timelineData: ITimelineData): string;
    static DATE_RANGE_TEXT(datePeriod: ITimelineDatePeriod): string;
    /**
     * Combines the first two partial date periods, into a single date period.
     * i.e. combines "Feb 1 2016 - Feb 5 2016" with "Feb 5 2016 - Feb 29 2016" into "Feb 1 2016 - Feb 29 2016"
     * @param datePeriods The list of date periods
     */
    static UNSEPARATE_SELECTION(datePeriods: ITimelineDatePeriod[]): void;
    static GET_INDEX_BY_POSITION(elements: number[], widthOfElement: number, position: number, offset?: number): number;
    static IS_ARRAYS_EQUAL(a: any[], b: any[]): boolean;
    static FIND_INDEX(array: any[], predicate: (value: any, index: number, array: any[]) => boolean): number;
    private static DateSplitter;
    private static MinFraction;
    private static TotalDaysInWeek;
    private static WeekDayOffset;
    private static DateArrayJoiner;
    /**
     * We should reduce the latest date of selection using this value,
     * because, as far as I understand, PBI Framework rounds off milliseconds.
     */
    private static OffsetMilliseconds;
    private static TotalMillisecondsInADay;
    private static previousDay;
}
