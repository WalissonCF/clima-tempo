import { createReducer, on } from "@ngrx/store";

import { OpenWeatherResponse } from "../../models/open-weather-response.model";
import { loadClimateError, loadClimateSuccess, loadingClimate } from "../actions/ climate.action";
import { IClimateState } from "../states/climate.state";

export const initialState: IClimateState = {
    entities: {} as OpenWeatherResponse,
    isLoading: false
}

export const climateReducer = createReducer(initialState,
    on(loadingClimate, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadClimateSuccess, (state, { payload }) => ({
        ...state,
        entities: payload,
        isLoading: false
    })),
    on(loadClimateError, (state) => ({
        ...state,
        isLoading: false 
    })),
);