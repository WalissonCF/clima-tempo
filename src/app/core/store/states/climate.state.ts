import { OpenWeatherResponse } from "../../models/open-weather-response.model";

export interface IClimateState {
    entities: OpenWeatherResponse;
    isLoading: boolean;
}