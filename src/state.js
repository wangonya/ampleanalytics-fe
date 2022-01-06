import {atom} from "recoil"

export const aggregateData = atom({
    key: "aggregateData",
    default: {}
})

export const timeseriesData = atom({
    key: "timeseriesData",
    default: []
})

export const breakdownData = atom({
    key: "breakdownData",
    default: []
})
