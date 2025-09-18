import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Calendar implements IVisual {
    private currentMonth;
    private currentYear;
    private host;
    private svg;
    private dateRangeContainer;
    private dateRangeDropDown;
    private container;
    private rootSelection;
    private titleText;
    private textValue;
    private textLabel;
    private rect;
    private calendarProperties;
    private static CalendarMargins;
    private static DefaultTextXOffset;
    private static DefaultTextYOffset;
    private highlightStart;
    private highlightEnd;
    private applyDateRange;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
}
