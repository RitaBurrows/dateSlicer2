//"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
import { select as d3Select, selectAll as d3SelectAll, Selection as D3Selection, } from "d3-selection";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;
import {
    ICalendarProperties,
    ICalendarMargins
} from "./interfaces"
import { Utils } from "./utils";

export class Calendar implements IVisual {
    private currentMonth: number;
    private currentYear: number;
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private dateRangeContainer: D3Selection<any, any, any, any>;
    private dateRangeDropDown: D3Selection<any, any, any, any>;
    private container: Selection<SVGElement>;
    private rootSelection: D3Selection<any, any, any, any>;
    private titleText: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;
    private rect: d3.Selection<SVGRectElement, any, any, any>;
    private calendarProperties: ICalendarProperties 
    private static CalendarMargins: ICalendarMargins = {
        LeftMargin: 20,
        RightMargin: 20,
        TopMargin: 40,
        BottomMargin: 20,
        CellWidth: 40,
        CellHeight: 40,
        CellPadding: 4,
        StartXpoint: 0,
        StartYpoint:20,
        HeaderHeight: 30,
        WeekdayLabelHeight: 20
    }
    private static DefaultTextXOffset: number = 5;
    private static DefaultTextYOffset: number = 20;
    private applyDateRange(range: string) { 
    const today = new Date();  
        switch (range) { 
            case "Today": 
                this.currentMonth = today.getMonth(); 
                this.currentYear = today.getFullYear(); 
                break; 
            case "Yesterday": 
                const yesterday = new Date(today); 
                yesterday.setDate(today.getDate() - 1); 
                this.currentMonth = yesterday.getMonth(); 
                this.currentYear = yesterday.getFullYear(); 
                break; 
            case "This Week": 
            case "Last Week": 
                // For week ranges, just jump to the month containing Monday of that week 
                const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon... 
                const monday = new Date(today); 
                monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); 
                if (range === "Last Week") { 
                    monday.setDate(monday.getDate() - 7); 
                } 
                this.currentMonth = monday.getMonth(); 
                this.currentYear = monday.getFullYear(); 
                break; 
            case "This Month": 
                this.currentMonth = today.getMonth(); 
                this.currentYear = today.getFullYear(); 
                break; 
            case "Last Month": 
                const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); 
                this.currentMonth = lastMonth.getMonth(); 
                this.currentYear = lastMonth.getFullYear(); 
                break; 
        } 
        // Force calendar redraw 
        this.update({ 
            type: powerbi.VisualUpdateType.Data | powerbi.VisualUpdateType.Resize, 
            viewport: { width: this.svg.node()?.clientWidth || 500, height: this.svg.node()?.clientHeight || 400 }, 
            viewMode: undefined, 
            dataViews: [], 
            jsonFilters: [] 
        }); 
    } 

 

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        const element: HTMLElement = options.element;
        this.rootSelection = d3Select(element)
            .append("div")
            .classed("calendarRoot", true)
            .style("display", "flex")
            .style("align-items", "flex-start");;  // optional for CSS
        this.dateRangeContainer = this.rootSelection
            .append("div") 
            .classed("dropDownContainer", true) 
            .style("margin-right", "10px"); 
        this.dateRangeDropDown = this.dateRangeContainer
            .append("select") 
            //.classed("dateDropDown", true) 
            .attr("id", "dateRangeDropdown") 
            .style("font-size", "14px") 
            .style("padding", "4px");
        this.svg = this.rootSelection
            .append('svg')
            .classed('calendarSvg', true)
        this.container = this.svg
            .append("g")
            .classed('calendarContainer', true);
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        //this.calendarProperties = { ...Calendar.CalendarMargins } as ICalendarProperties; 
        this.calendarProperties = {
            topMargin: Calendar.CalendarMargins.TopMargin, 
            bottomMargin: Calendar.CalendarMargins.BottomMargin, 
            leftMargin: Calendar.CalendarMargins.LeftMargin, 
            rightMargin: Calendar.CalendarMargins.RightMargin, 
            // cell dimensions (each day box) 
            cellWidth: Calendar.CalendarMargins.CellWidth,    // width of a single day cell 
            cellHeight: Calendar.CalendarMargins.CellHeight,  // height of a single day cell 
            cellPadding: Calendar.CalendarMargins.CellPadding, // inner spacing 
            // grid layout (rows = weeks, cols = days) 
            daysInWeek: 7, 
            weeksInMonth: 6, // typical calendar grid 
            startXpoint: Calendar.CalendarMargins.StartXpoint, 
            startYpoint: Calendar.CalendarMargins.StartYpoint, 
            // header/legend 
            headerHeight: Calendar.CalendarMargins.HeaderHeight, // month name or day labels 
            weekdayLabelHeight: Calendar.CalendarMargins.WeekdayLabelHeight, 
        
            // text positioning 
            textXOffset: Calendar.DefaultTextXOffset, 
            textYOffset: Calendar.DefaultTextYOffset, 
        };
    }

    public update(options: VisualUpdateOptions) {
        console.log("Visual update called", options);
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        let props = this.calendarProperties;
        this.svg.selectAll("*").remove();
        let startX = props.startXpoint + props.leftMargin;
        let startY = props.startYpoint + props.topMargin;
        let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
         
        const ranges = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"];
        this.dateRangeDropDown
        .selectAll("option") 
        .data(ranges) 
        .enter() 
        .append("option") 
        .text(d => d) 
        .attr("value", d => d);
        this.dateRangeDropDown
        .on("change", (event: any) => { 
            const value = event.target.value; 
            this.applyDateRange(value); 
    }); 

        this.svg
            .attr("width", width)
            .attr("height", height);

            const displayMonth = (monthIndex: number): string => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[monthIndex];
        };
        this.svg
            .append("text")
            .attr("class", "monthLabel")
            .attr("x", startX + 30)
            .attr("y", startY - props.weekdayLabelHeight - 25)
            .attr("text-anchor", "end")
            .attr("font-size", "18px")
            .attr("dx", (props.daysInWeek * props.cellWidth) / 2 - props.cellWidth / 2)            
            .attr("fill", "#255A91") 
            .text(displayMonth(this.currentMonth) + " " + this.currentYear);
        
        //let monthLabelWidth = (props.daysInWeek * props.cellWidth);

            // Up arrow 
        this.svg.append("text") 
            .attr("class", "arrowUp") 
            .attr("x", startX + props.daysInWeek * props.cellWidth - 100) 
            .attr("y", startY - props.weekdayLabelHeight - 25) 
            .attr("font-size", "12px")            
            .attr("fill", "#255A91")
            .style("cursor", "pointer")
            .text("▲") 
            .on("click", () => { 
                this.currentMonth++; 
                if (this.currentMonth > 11) { 
                    this.currentMonth = 0; 
                    this.currentYear++; 
                } 
                this.update(options); // redraw 
            }); 

        // Down arrow 
        this.svg.append("text") 
            .attr("class", "arrowDown") 
            .attr("x", startX + props.daysInWeek * props.cellWidth - 75) 
            .attr("y", startY - props.weekdayLabelHeight - 25) 
            .attr("font-size", "12px")            
            .attr("fill", "#255A91") 
            .style("cursor", "pointer") 
            .text("▼")//("↓") 
            .on("click", () => { 
                this.currentMonth--; 
                if (this.currentMonth < 0) { 
                    this.currentMonth = 11; 
                    this.currentYear--; 
                } 
                this.update(options); // redraw 
            }); 


        this.svg.selectAll(".weekdayLabel")
            .data(weekdays)
            .enter()
            .append("text")
            .attr("class", "weekdayLabel")
            .attr("x", (d, i) => startX + i * props.cellWidth + props.textXOffset)
            .attr("y", startY - props.weekdayLabelHeight) 
            .attr("font-size", "14px")            
            .attr("fill", "#255A91")
            .text(d => d);
            
        
        let totalDays = props.daysInWeek * props.weeksInMonth; // 42 slots
        const daysInMonth = Utils.getNumberofDaysInCurrMonth(this.currentYear, this.currentMonth);
        let firstDayOfMonth = Utils.getFirstDayOfMonth(this.currentYear, this.currentMonth); // 0=Sun, 1=Mon, ..., 6=Sat
        firstDayOfMonth = (firstDayOfMonth + 6) % 7; 
        const daysInPrevMonth = Utils.getNumberofDaysInPrevMonth(this.currentYear, this.currentMonth);
        //let leadingEmptyDays = (firstDayOfMonth + 6) % 7; // convert so Mon=0,...Sun=6
        //let daysArray = Array.from({ length: totalDays }, (_, i) => i + 1); 
        let daysArray: { day: number, inMonth: boolean }[] = []; 
        // Fill previous month's trailing days 
        for (let i = 0; i < firstDayOfMonth; i++) { 
            daysArray.push({ 
                day: daysInPrevMonth - firstDayOfMonth + i + 1, 
                inMonth: false 
            }); 
        } 
        // Fill current month days 
        for (let d = 1; d <= daysInMonth; d++) { 
            daysArray.push({ day: d, inMonth: true }); 
        }         
        // Fill next month leading days until 42 cells 
        let nextDay = 1; 
        while (daysArray.length < 42) { 
            daysArray.push({ day: nextDay++, inMonth: false }); 
        }  
        const today = new Date(); 
 
        const dayGroups = this.svg.selectAll(".dayGroup") 
            .data(daysArray) 
            .enter() 
            .append("g") 
            .attr("class", "dayGroup") 
            .attr("transform", (d, i) => { 
                const x = startX + (i % props.daysInWeek) * props.cellWidth; 
                const y = startY + Math.floor(i / props.daysInWeek) * props.cellHeight; 
                return `translate(${x}, ${y})`; 
            }); 
        
        // Background rect 
        dayGroups.append("rect") 
            .attr("class", "dayCell") 
            .attr("width", props.cellWidth - props.cellPadding) 
            .attr("height", props.cellHeight - props.cellPadding) 
            .style("fill", "#ffffff") 
        
        // Circle for today 
        dayGroups.filter(d => 
            d.inMonth && 
            this.currentYear === today.getFullYear() && 
            this.currentMonth === today.getMonth() && 
            d.day === today.getDate() 
        ).append("circle") 
            .attr("cx", (props.cellWidth - props.cellPadding) / 2) 
            .attr("cy", (props.cellHeight - props.cellPadding) / 2) 
            .attr("r", Math.min(props.cellWidth, props.cellHeight) / 2 - props.cellPadding) 
            .style("fill", "#255A91") 
            //.style("opacity", 0.2); 
        
        // Day number text 
        dayGroups.append("text") 
            .attr("class", "dayNumber") 
            .attr("x", props.textXOffset) 
            .attr("y", props.textYOffset) 
            .attr("font-size", "12px")            
            //.attr("fill", "#")
            .style("fill", d => d.inMonth ? "#255A91" : "#999") 
            .style("font-weight", d =>  
                d.inMonth && 
                this.currentYear === today.getFullYear() && 
                this.currentMonth === today.getMonth() && 
                d.day === today.getDate() ? "bold" : "normal")                 
            .style("fill", d =>  
                d.inMonth && 
                this.currentYear === today.getFullYear() && 
                this.currentMonth === today.getMonth() && 
                d.day === today.getDate() ? "white" : d.inMonth ? "#255A91" : "#999") 
            .text(d => d.day); 
    } 

}
