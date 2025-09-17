import { Calendar } from "../../src/calendar";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var datePicker2D48A1603A5164157AE234EC418C72DFB_DEBUG: IVisualPlugin = {
    name: 'datePicker2D48A1603A5164157AE234EC418C72DFB_DEBUG',
    displayName: 'DatePicker2',
    class: 'Calendar',
    apiVersion: '5.11.0',
    create: (options?: VisualConstructorOptions) => {
        if (Calendar) {
            return new Calendar(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["datePicker2D48A1603A5164157AE234EC418C72DFB_DEBUG"] = datePicker2D48A1603A5164157AE234EC418C72DFB_DEBUG;
}
export default datePicker2D48A1603A5164157AE234EC418C72DFB_DEBUG;