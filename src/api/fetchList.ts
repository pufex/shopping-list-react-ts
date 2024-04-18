import type {ListItemType} from "../App"

export const fetchList = (): ListItemType[] => {
    const storedList: string | null = localStorage.getItem("products-list")
    if(!storedList) return [];
    else return JSON.parse(storedList)
}