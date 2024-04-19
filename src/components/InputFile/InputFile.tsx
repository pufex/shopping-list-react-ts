import React from 'react'
import { useRef, useState } from 'react'
import "./InputFile.css"

type InputFileProps = {
    defaultImage: string,
    image: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = ({defaultImage, image, onChange}:InputFileProps): React.ReactElement => {
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        inputRef.current?.click();
    }

    return <>
        <div 
            className="input-file__container"
        >
            {
                <div className='input-image__image-container'> 
                    {
                        image
                            ? <img 
                                src={image} 
                                alt="Your picture" 
                                onClick={handleImageClick}
                                className='input-image__image'
                            />
                            : <img 
                                src={defaultImage} 
                                alt="Default picture" 
                                onClick={handleImageClick}
                                className='input-image__image'
                            />
                    }
                    <h1 className="input-file__directions">
                        {
                            image 
                                ? "Here's a preview of your icon!"
                                : "Click on icon to upload new one!"
                        }
                    </h1>
                </div>
            } 
            <input 
                type="file" 
                ref={inputRef} 
                style={{
                    display: "none",
                }}
                onChange={onChange}
            />
        </div>
    </>

}

export default InputFile
