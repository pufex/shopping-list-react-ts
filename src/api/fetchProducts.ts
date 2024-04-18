import axios from "axios"

export function getProducts() {
    return axios
        .get("/products.json")
        .then(res => res.data)
}