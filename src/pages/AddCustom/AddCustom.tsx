import React, { useState } from 'react'
import "./AddCustom.css"
import { useCustomContext } from '../../App'
import Input from '../../components/Input/Input'
import { nanoid } from 'nanoid'
import { Navigate, useNavigate } from 'react-router-dom'
import InputFile from '../../components/InputFile/InputFile'
const AddCustom = (): React.ReactElement => {

  let navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleReaderLoad = (reader: FileReader) => {
    console.log(reader.result)
    setImage(typeof reader.result == "string" ? reader.result : "");
    reader.removeEventListener("load", () => handleReaderLoad(reader))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files ? e.target.files[0] : undefined

    const reader = new FileReader();

    if(!file)
      setImage("");
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
    addCustom({
      id: nanoid(),
      name: name,
      price: parseFloat(price),
      image: image,
    })
    navigate("/add-product")
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
        value={name}
        onChange={(e) => setName(e.target.value)} 
      >
        Product's name
      </Input>
      <Input
        placeholder='Price here'
        value={price}
        onChange={(e) => setPrice(e.target.value)} 
      >
        Product's price
      </Input>
    </div>

    <InputFile 
      defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWjILDKe5i7uXCXEaYIbLdnC9lmOJgs0huLV7UP4_GA&s"
      image={image}
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
