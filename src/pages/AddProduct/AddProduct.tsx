import React, { useState } from 'react'
import { useProductsContext } from '../../App'
import { useCustomContext } from '../../App';
import { useListContext } from '../../App';
import type { ListItemType } from '../../App';
import { FaShoppingCart } from "react-icons/fa";
import StartCustom from "../../components/StartCustom/StartCustom"
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "./AddProduct.css"

const AddProduct = () => {
  
  const availableProducts = useProductsContext();
  const { addItem } = useListContext();
  const { customs, removeCustom } = useCustomContext();


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
          onDelete={(id: ListItemType["id"]) => removeCustom(id)}
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
  show?: boolean,
  children?: React.ReactElement[] | React.ReactElement,
  onDelete?: (id: ListItemType["id"]) => void;
}

const ProductsDropdown = ({title, list, onChoice, onDelete, show}:ProductsDropdownProps): React.ReactElement => {
  
  const [display, setDisplay] = useState(show ? show : false);
  const [search, setSearch] = useState("");

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
      <div 
        className="products-dropdown__content"
        style={{
          display: display ? "flex" : "none",
        }}
      >
        <div className='products-dropdown__search-container'>
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="products-dropdown__search"
            placeholder='Search for an item'
          />
          <FaSearch 
            color="black"
            size={40

            }
          />
        </div>
        <ul
          className="products-dropdown__list"
        >
          {
          
            list?.
            filter((item) => {
              if(search == "") return true
              else{
                if(
                  item.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
                ) return true;
                else return false
              }
            }).
            map((item) => {
                return <li
                  className={
                    productsOnList.some((onList) => onList.id == item.id)
                      ? 'products-dropdown__item on-list'
                      : 'products-dropdown__item'
                  }
                  onClick={() => {
                      onChoice({...item, checked: false})
                  }}
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
                    <div className='products-dropdown__indicators'>
                      <div className="products-dropdown__indicator products-dropdown__indicator--on-list">
                        <FaShoppingCart 
                          color='white'
                          size={30}
                        />
                      </div>
                      {
                        onDelete 
                          ? <div 
                              className='products-dropdown__indicator products-dropdown__indicator--delete'
                              onClick={() => onDelete(item.id)}
                            >
                              <FaTrash 
                                color="white"
                                size={30}
                              />
                            </div>
                          : null
                      }
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
    </div>
  </>
  
}
