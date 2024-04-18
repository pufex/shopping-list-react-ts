import { useEffect, useState } from 'react'
import './assets/App.css'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import AddProduct from './pages/AddProduct/AddProduct'
import Loading from './components/Loading/Loading'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'
import Navbar from './components/Navbar/Navbar'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from "./api/fetchProducts.ts"
import { fetchList } from './api/fetchList'
import { createContext, useContext } from 'react'

export type ListItemType = {
  id: number,
  name: string,
  image:  string,
  price: number,
  checked: boolean,
}


type ProductsContextType = ListItemType[];

const ProductsContext = createContext<ProductsContextType | null>(null);

export const useProductsContext = () => {
  const productsContext = useContext(ProductsContext)
  if(!productsContext)
    throw Error("Can't be used outside a provider.")
  else 
    return productsContext;
}

type ListContextType = {
    list: ListItemType[],
    addItem: (addedItem: ListItemType) => void | boolean,
    removeItem: (id: ListItemType["id"]) => void | boolean,
    switchItemCheck: (id: ListItemType["id"]) => void,
}

const ListContext = createContext<ListContextType | null>(null);

export const useListContext = () => {
   const listContext = useContext(ListContext);
   if(!listContext)
    throw Error("Cannot use outside a provider.")
  else return listContext
}

function App() {

  const [list, setList] = useState<ListItemType[]>(fetchList());

  useEffect(() => {
    localStorage.setItem("products-list", JSON.stringify(list))
  }, [list])

  const addItem = (addedItem: ListItemType): void | boolean => {
    if(list.some((item) => item.id == addedItem.id))
      return false
    else setList([...list, addedItem])
  }

  const removeItem = (id: ListItemType["id"]): void | boolean => {
    if(!list.some((item) => item.id == id))
      return false
    else{
      let newList = list.slice();
      newList = newList.filter((item) => item.id != id)
      setList(newList)
    } 
  }

  const switchItemCheck = (id: ListItemType["id"]): void | boolean => {
    let newList = list.slice();
    if(!newList.some((item) => item.id == id))
      return false;
    else{
      console.log("ambatublast")
      newList = newList.map((item) => {
        if(item.id == id)
          item.checked = !item.checked
        return item
      })
      setList(newList)
    } 
  }

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  if(productsQuery.status == "pending") 
    return <>
      <Routes>
        <Route 
          path="/*"
          element={<Loading />}
        />
      </Routes>
    </>
  if(productsQuery.status == "error") 
    return <>
      <Routes>
        <Route 
          path="/*"
          element={<ErrorComponent />}
        />
      </Routes>
  </>

  return <ProductsContext.Provider
    value={productsQuery.data}
  >
    <ListContext.Provider
      value={{
        list: list,
        addItem: addItem,
        removeItem: removeItem,
        switchItemCheck: switchItemCheck,
      }}
    >
      <Navbar />
      <Routes>
        <Route 
          path="/"
          element={<List />}
        />
        <Route 
          path="/add-product"
          element={<AddProduct />}
        />
      </Routes>
    </ListContext.Provider>
  </ProductsContext.Provider>
}

export default App
