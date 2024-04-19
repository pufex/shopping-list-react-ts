import React, { useState } from 'react'
import { useProductsContext } from '../../App'
import { useCustomContext } from '../../App';
import { useListContext } from '../../App';
import type { ListItemType } from '../../App';
import { FaShoppingCart } from "react-icons/fa";
import StartCustom from "../../components/StartCustom/StartCustom"
import "./AddProduct.css"

const AddProduct = () => {
  
  const availableProducts = useProductsContext();
  const { addItem } = useListContext();
  const { customs } = useCustomContext();


  return <>
    <StartCustom />
    <main className="add-product__main">
      <section className='add-product__dropdowns'>
        <ProductsDropdown
          title="Available Products"
          list={availableProducts}
          onChoice={addItem}
        />
        <ProductsDropdown
          title="Custom products"
          list={customs}
          onChoice={addItem}
        />
      </section>
      <footer className="product__placement-container">
        <span className="product__placement">
          Like the page? Check out <a href="https://github.com/pufex" target="_blank">{" my github"}</a>!
        </span>
      </footer>
    </main>
  </>
}

export default AddProduct

type ProductsDropdownProps = {
  title: string,
  list: Pick<ListItemType, "id" | "name" | "image" | "price">[],
  onChoice: (item: ListItemType) => void | boolean,
}

const ProductsDropdown = ({title, list, onChoice}:ProductsDropdownProps): React.ReactElement => {
  
  const [display, setDisplay] = useState(false);

  const productsOnList = useListContext().list;

  return <>
    <div className="products-dropdown__container">
      <button
        className={
          display
            ? "btn btn--revealList active"
            : "btn btn--revealList"
        }
        onClick={() => {setDisplay(!display)}}
      >
        {title}
      </button>
      <ul
        className="products-dropdown__list"
        style={{
          display: display ? "flex" : "none",
        }}
      >
        {
        
          list?.map((item) => {
              return <li
                className={
                  productsOnList.some((onList) => onList.id == item.id)
                    ? 'products-dropdown__item on-list'
                    : 'products-dropdown__item'
                }
                onClick={() => {onChoice({...item, checked: false})}}
              >
                <div className="products-dropdown__item--left">
                  <img 
                    className="products-dropdown__item-icon"
                    src={item.image} 
                    alt={item.name}
                  />
                  <span className="products-dropdown__item-title">
                    {item.name}
                  </span>
                  <div className="products-dropdown__indicator products-dropdown__indicator--on-list">
                    <FaShoppingCart 
                      color='white'
                      size={30}
                    />
                  </div>
                </div>
                <span className='products-dropdown__item-price'>
                  {`${typeof item.price == "number" ? item.price.toFixed(2) : "invalid"} PLN`}
                </span>
              </li>
          })
        
        }
      </ul>
    </div>
  </>
  
}
