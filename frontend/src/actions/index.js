import {
    SEARCH
} from "./types"

export const search = (term) => {
    return {
        type: SEARCH,
        payload: term
    }
}