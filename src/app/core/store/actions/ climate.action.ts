import { createAction, props } from "@ngrx/store";

import { OpenWeatherResponse } from "../../models/open-weather-response.model";

export const loadingClimate = createAction('Load climate');
export const loadClimateSuccess = createAction('Load climate success', props<{ payload: OpenWeatherResponse }>());
export const loadClimateError = createAction('Load climate error');