import { 
	EventManagerObject, 
	EventManagerCallbackParams, 
	EventManagerCallback,
	EventManagerEmmitConfig
} from '~/utils/app/events/event-manager-types';

export class EventManager {
	private static INSTANCE: EventManager;
	private events: EventManagerObject;

	private constructor() {
		this.events = new Map();
	}

	public static getInstance() {
		if(!this.INSTANCE) {
			this.INSTANCE = new EventManager();
		}

		return this.INSTANCE;
	}

	public on(event: string, callback: EventManagerCallback): CallableFunction {
		const listeners = this.events.get(event);

		if(listeners) {
			listeners.add(callback);
		} else {
			this.events.set(event, new Set([callback]));
		}

		return () => {
			this.events.get(event)?.delete(callback);
		};
	}  

	public emmit(
		event: string, 
		params?: Partial<EventManagerCallbackParams>,
		config?: Partial<EventManagerEmmitConfig>,
	) {
		const listeners = this.events.get(event);
		const emmitConfiguration = this.getDefaultEmmitConfig(config ?? {});

		if(listeners) {
			for(const callback of listeners.values()) {
				if(emmitConfiguration.withMiddleware) {
					this.middleware(event, params);
				}
				callback.call(null, params);
			}
		}
	}

	private getDefaultEmmitConfig(config: Partial<EventManagerEmmitConfig>): EventManagerEmmitConfig {
		const emmitConfig: EventManagerEmmitConfig = {
			withMiddleware: false,
		};
		return Object.assign(emmitConfig, config);
	}

	middleware(event: string, params?: Partial<EventManagerCallbackParams>) {
		const paramsSTR = JSON.stringify(params);
		console.log(`[EventManager] >>>> Emmit event: ${event} with params: ${paramsSTR}`);
	}
}