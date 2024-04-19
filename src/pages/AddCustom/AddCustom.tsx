import React, { useState } from 'react'
import "./AddCustom.css"
import { useCustomContext } from '../../App'
import Input from '../../components/Input/Input'
import { nanoid } from 'nanoid'
import { Navigate, useNavigate } from 'react-router-dom'
import InputFile from '../../components/InputFile/InputFile'
import { useOptionsContext } from '../../App'

type ForInputType = {
  value: string,
  isInvalid: boolean,
}

const AddCustom = (): React.ReactElement => {

  let navigate = useNavigate();

  const [redirectToAdds] = useOptionsContext().redirectToAdds

  const [name, setName] = useState<ForInputType>({
    value: "",
    isInvalid: false,
  });
  const [price, setPrice] = useState<ForInputType>({
    value: "",
    isInvalid: false,
  });
  const [image, setImage] = useState<ForInputType>({
    value: "",
    isInvalid: false,
  });

  const handleReaderLoad = (reader: FileReader) => {
    console.log(reader.result)
    setImage({...image, value: typeof reader.result == "string" ? reader.result : ""});
    reader.removeEventListener("load", () => handleReaderLoad(reader))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files ? e.target.files[0] : undefined

    const reader = new FileReader();

    if(!file)
      setImage({...image, value: ""});
    else if (file.size > 100000)
      alert("File size exceeded.");
    else {
      reader.addEventListener("load", () =>  handleReaderLoad(reader))
      reader.readAsDataURL(file)
    }
  }

  const {addCustom} = useCustomContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let shouldReturn = false;
    if(name.value == ""){
      setName({...name, isInvalid: true});
      shouldReturn = true;
    }else setName({...name, isInvalid: false})
    if(price.isInvalid || price.value == ""){
      setPrice({...price, isInvalid: true})
      shouldReturn = true;
    }else setName({...name, isInvalid: false})

  
    if(shouldReturn) return;
    
    addCustom({
      id: nanoid(),
      name: name.value,
      price: parseFloat(price.value),
      image: image.value ? image.value : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWjILDKe5i7uXCXEaYIbLdnC9lmOJgs0huLV7UP4_GA&s",
    })
    if(redirectToAdds)
      navigate("/add-product")
    else{
      setName({value: "", isInvalid: false});
      setPrice({value: "", isInvalid: false});
    }
  }

  return <form
    className='add-custom__main'
    onSubmit={handleSubmit}
  >
    <h1
     className='add-custom__header'
    >
      Add custom product!
    </h1>
    <div className='add-custom__wrapper'>
      <Input
        placeholder='Name here'
        value={name.value}
        onChange={(e) => setName({...name, value: e.target.value})}
        isInvalid={name.isInvalid} 
        errorMessage={"Can't be left empty"}
        >
        Product's name
      </Input>
      <Input
        placeholder='Price here'
        value={price.value}
        onChange={(e) => {
          if(!isNaN(parseFloat(e.target.value)))
            setPrice({isInvalid: false, value: e.target.value})
          else
          setPrice({isInvalid: true, value: e.target.value})
        }}
        isInvalid={price.isInvalid} 
        errorMessage={"Invalid price"}
      >
        Product's price
      </Input>
    </div>

    <InputFile 
      defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWjILDKe5i7uXCXEaYIbLdnC9lmOJgs0huLV7UP4_GA&s"
      image={image.value}
      onChange={handleImageChange}
    />

    <button
      className="btn btn--submit"
      type='submit'
    >
      Create product
    </button>
  </form>
}

export default AddCustom
