export interface OpenWeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    alerts: Alerts[];
    current: Current;
    daily: Daily[];
    hourly: Hourly[];
    minutely: Minutely[];
}

interface Alerts {
    description: string;
    end: number;
    event: string;
    sender_name: string;
    start: number;
    tags: string[];
}

interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
}

interface Weather {
    id: number;
    main: string;
    description: string
    icon: string;
}

interface Daily {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: FeelsLike;
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    rain: number;
    summary: string;
    sunrise: number;
    sunset: number
    temp: Temp;
    uvi: number;
    weather: Weather[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}

interface FeelsLike {
    day: number;
    eve: number;
    morn: number;
    night: number;
}

interface Temp {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}

interface Hourly {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pop: number;
    pressure: number;
    rain: number[];
    temp: number;
    uvi: number;
    visibility: number;
    weather: Weather[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}

interface Minutely {
    dt: number;
    precipitation: number;
}