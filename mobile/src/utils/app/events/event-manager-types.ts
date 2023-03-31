export interface EventManagerCallbackParams {
   eventValue?: string | Record<string, string>;
   eventName?: string;
   eventType?: string;
   eventScreenId?: string;
}

export type EventManagerCallback = (params?: Partial<EventManagerCallbackParams>) => void;
export type EventManagerObject = Map<string, Set<EventManagerCallback>>;

export interface EventManagerEmmitConfig {
   withMiddleware: boolean;
}