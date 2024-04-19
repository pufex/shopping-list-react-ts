import { useListContext } from '../../App'
import StartAdding from '../../components/StartAdding/StartAdding';
import Checkbox from '../../components/Checkbox/Checkbox';
import { ImCheckmark } from "react-icons/im";
import "./List.css"
import { useState } from 'react';
import { mergeClasses } from '../../utils/mergeClasses';
import { useOptionsContext } from '../../App';

const List = () => {

  const [reverseControls] = useOptionsContext().reverseControls

  const {list, switchItemCheck, removeItem} = useListContext();
  const [hideChecked, setHideChecked] = useState<boolean>(false);
  const [sortByUnchecked, setSortByUnchecked] = useState<boolean>(true)
  const [toggleRemove, setToggleRemove] = useState<boolean>(false)

  const shoppingList = list?.
    filter((item) => {
      if(!hideChecked)
        return true
      else{
        if(item.checked)
          return false
        else return true;
      }
    }).
    sort((x, y) => { 
      if(!sortByUnchecked)
        return 0;
      else return Number(x.checked) - Number(y.checked) 
    }).
    map((item) => {
      return <li
        className={
          mergeClasses(
            "shopping-list__item", 
            toggleRemove ? "toggle-remove" : "", 
            reverseControls ? "reverse-options" : ""
          )
        }
        onClick={() => {
          if(!toggleRemove) return;
          else{
            removeItem(item.id)
          }
        }}
      >
        <div className="shopping-list__item--left">
          <img 
            className="shopping-list__item-icon"
            src={item.image} 
            alt={item.name}
          />
          <div className="shopping-list__item--left-wrapper">
            <span className="shopping-list__item-title">
              {item.name}
            </span>
            <span className='shopping-list__item-price'>
              {`${typeof item.price == "number" ? item.price.toFixed(2) : "invalid"} PLN`}
            </span>
          </div>
        </div>
        <div className="shopping-list__item--right">
          <button
            className={
              item.checked
                ? "btn btn--check active"
                : "btn btn--check"
            }
            onClick={() =>  switchItemCheck(item.id)}
          > 
            <ImCheckmark 
              color='white'
              size={50}
            />
          </button>
        </div>
      </li>
    })

  if(list.length == 0) 
    return <>
      <StartAdding />
      <div className='list-empty'>
        <h1 className="list-empty__header">
          No products yet...
        </h1>
        <p className="list-empty__description">
          If you want to add products to the list, use the button in the bottom right corner of the screen!
        </p>
      </div>
    </>

  return <>
    <StartAdding />
    <main
      className="list-main"
    >
      <header
        className="list__header"
      >
        <h1 className="list__heading">Shopping list</h1>
        <div
          className='list__options'
        >
          <Checkbox
            onCheck={() => setHideChecked(previousState => !previousState)}
            checked={hideChecked}
          >
            Hide checked
          </Checkbox>
          <Checkbox
            onCheck={() => setSortByUnchecked(previousState => !previousState)}
            checked={sortByUnchecked}
          >
            Sort by unchecked
          </Checkbox>
          <Checkbox
            onCheck={() => setToggleRemove(previousState => !previousState)}
            checked={toggleRemove}
          >
            Toggle Remove
          </Checkbox>
        </div>
      </header>
      <div className="shopping-list__container">
        <div className='shopping-list__total-container'>
          <span className="shopping-list__total-title">
            In Total: 
          </span>
          <span className="shopping-list__total">
            {
              `~${list.reduce((accumulator, item) => accumulator + item.price, 0).toFixed(2)} PLN`
            }
          </span>
        </div>
        <ul className="list__shopping-list">
          {
            shoppingList.length != 0
              ? shoppingList
              : <div
                className='list__no-items'
              >
                Can't find any items!
              </div>
          }
        </ul> 
      </div>
    </main>
  </>
  
}

export default List
