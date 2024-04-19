import type {ListItemType} from "../App"

export const fetchCustoms = (): ListItemType[] => {
    const storedCustoms: string | null = localStorage.getItem("customs")
    if(!storedCustoms) return [];
    else return JSON.parse(storedCustoms)
}