export interface SearchResultModel {
    Active?: SearchResultValues;
}

// create an enum with three values
export enum SearchResultValues {
    Nothing = 0,
    Analysis = 1,
    Generate = 2,
}