import React from 'react'
import "./Options.css"
import Checkbox from '../../components/Checkbox/Checkbox'
import { useOptionsContext } from '../../App'
import { useCustomContext } from '../../App'
import { useListContext } from '../../App'

const Options = (): React.ReactElement => {

  const [reverseControls, switchReverseControls] = useOptionsContext().reverseControls
  const [reverseBigPlus, switchReverseBigPlus] = useOptionsContext().reverseBigPlus
  const [redirectToAdds, switchRedirectToAdds] = useOptionsContext().redirectToAdds
  

  const { removeAllCustoms } = useCustomContext();
  const { removeAllItems } = useListContext();

  return <>
    <main className='options__main'>
      <h1 className='options__heading'>
        App Options
      </h1>
      <section className='options__options-container'>
        <h1 className='options__list-title'>
          Customise
        </h1>
        <ul className='options__list'>
          <Checkbox
            checked={reverseControls}
            onCheck={switchReverseControls}
          >
            Reverse list controls
          </Checkbox>
          <Checkbox
            checked={reverseBigPlus}
            onCheck={switchReverseBigPlus}
          >
            Reverse add products
          </Checkbox>
        </ul>
      </section>
      <section className="options__options-container">
        <h1 className="options__list-title">
          Add Customs
        </h1>
        <ul className="options__list">
            <Checkbox
              checked={redirectToAdds}
              onCheck={switchRedirectToAdds}
            >
              Redirect on custom creation
            </Checkbox>
        </ul>
      </section>
      <section className="options__options-container">
        <h1
          className="options__list-title"
        >
          Resets
        </h1>
        <ul className="options__list">
          <button
            className="btn btn--resets btn--delete-customs"
            onClick={removeAllCustoms}
          >
            Remove all customs
          </button>
          <button
            className="btn btn--resets btn--delete-items"
            onClick={removeAllItems}
          >
            Remove all items
          </button>
        </ul>
      </section>
    </main>
  </>
}

export default Options
