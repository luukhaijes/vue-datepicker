import { ComponentOptionsMixin, ComputedOptions, DefineComponent, MethodOptions } from "vue";

type EmitEvents = 'dateChange';

interface VueDatepicker {
  date?: Date
}

interface PublicMethods extends MethodOptions {
  dateChange: () => Date
}

declare const _default: DefineComponent<VueDatepicker,
  {},
  {},
  ComputedOptions,
  PublicMethods,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitEvents[],
  EmitEvents,
  VueDatepicker
  >

export default _default;