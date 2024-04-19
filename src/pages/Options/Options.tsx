import React from 'react'
import "./Options.css"
import Checkbox from '../../components/Checkbox/Checkbox'
import { useOptionsContext } from '../../App'

const Options = (): React.ReactElement => {

  const [reverseControls, switchReverseControls] = useOptionsContext().reverseControls
  const [reverseBigPlus, switchReverseBigPlus] = useOptionsContext().reverseBigPlus

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
    </main>
  </>
}

export default Options
