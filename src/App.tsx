import { useEffect, useState } from 'react'
import './assets/App.css'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import AddProduct from './pages/AddProduct/AddProduct'
import AddCustom from './pages/AddCustom/AddCustom.tsx'
import Options from './pages/Options/Options.tsx'
import Loading from './components/Loading/Loading'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'
import Navbar from './components/Navbar/Navbar'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from "./api/fetchProducts.ts"
import { fetchList } from './api/fetchList'
import { fetchCustoms } from './api/fetchCustoms'
import { createContext, useContext } from 'react'

export type ListItemType = {
  id: number | string,
  name: string,
  image:  string,
  price: number,
  checked: boolean,
}

type OptionsContextType = {
  reverseControls: [
    boolean,
    () => void
  ],
  reverseBigPlus: [
    boolean,
    () => void
  ]
}

const OptionsContext = createContext<OptionsContextType | null>(null);

export const useOptionsContext = () => {
  const optionsContext = useContext(OptionsContext);
  if(!optionsContext)
    throw Error("Cannot use outside a provider.")
  else return optionsContext;
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

type CustomContextType = {
  customs: Omit<ListItemType, "checked">[],
  addCustom: (custom: Omit<ListItemType, "checked">) => void
  removeCustom: (id: ListItemType["id"]) => void,
}

const CustomsContext = createContext<CustomContextType | null>(null);

export const useCustomContext = () => {
  const customContext = useContext(CustomsContext);
  if(!customContext)
    throw Error("Cannot use outside a provider.")
  else return customContext;
}

function App() {

  const [list, setList] = useState<ListItemType[]>(fetchList());
  const [customs, setCustoms] = useState<Omit<ListItemType, "checked">[]>(fetchCustoms());

  const [reverseControls, setReverseControls] = useState<boolean>(false)
  const [reverseBigPlus, setReverseBigPlus] = useState<boolean>(false)

  const switchReverseControls = () => {
    setReverseControls(previousState => !previousState)
  }

  const switchReverseBigPlus = () => {
    setReverseBigPlus(previousState => !previousState)
  }

  useEffect(() => {
    localStorage.setItem("customs", JSON.stringify(customs))
  }, [customs])

  const addCustom = (custom: Omit<ListItemType, "checked">) => {
    setCustoms(previousCustoms => [...previousCustoms, custom])
  }

  const removeCustom = (id: ListItemType["id"]) => {
    let newCustoms = customs.slice();
    newCustoms = newCustoms.filter((custom) => custom.id != id)
    setCustoms(newCustoms)
  }

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
      <OptionsContext.Provider
        value={{
          reverseControls: [
            reverseControls,
            switchReverseControls
          ],
          reverseBigPlus: [
            reverseBigPlus,
            switchReverseBigPlus
          ]
        }}
      >
        <ListContext.Provider
          value={{
            list: list,
            addItem: addItem,
            removeItem: removeItem,
            switchItemCheck: switchItemCheck,
          }}
        >
          <CustomsContext.Provider
            value={{
              customs: customs,
              addCustom: addCustom,
              removeCustom: removeCustom
            }}
          >
            <Navbar />
            <Routes>
              <Route 
                path="/"
                element={<List />}
              />
              <Route 
                path="/options"
                element={<Options />}
              />
              <Route 
                path="/add-product"
                element={<AddProduct />}
              />
              <Route 
                path="/add-custom"
                element={<AddCustom />}
              />
            </Routes>
          </CustomsContext.Provider>
        </ListContext.Provider>
      </OptionsContext.Provider>
    </ProductsContext.Provider>

}

export default App
