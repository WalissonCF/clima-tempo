import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IClimateState } from "../states/climate.state";

const getClimateState = createFeatureSelector<IClimateState>('climate');

export const getClimate = createSelector(
    getClimateState,
    (state: IClimateState) => state.entities
);

export const getClimateIsLoading = createSelector(
    getClimateState,
    (state: IClimateState) => state.isLoading
);