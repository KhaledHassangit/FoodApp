"use client"
import { useRef ,useState } from "react"
import style from "./image-picker.module.css"
import Image from "next/image"

export default function ImagePicker({label,name}){
    const imageInputref = useRef()
    const [SelectedImage, setSelectedImage] = useState()
    function handlePick(){
        imageInputref.current.click()
    }
    function handleImageChange(e){

        const file = e.target.files[0]
        if(!file){
            return;
        }

        const fileReader =  new FileReader()
        fileReader.onload = () => {
            setSelectedImage(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }
    return (
        <div className={style.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={style.controls}>
                <input
                onChange={handleImageChange} 
                ref={imageInputref} className={style.input} 
                type="file" id={name} 
                accept="image/png, image/jpeg"
                name={name}/>
                <button onClick={handlePick} className={style.button} type="button">Pick an Image</button>
                <div className={style.preview}>
                    {!SelectedImage && <p>No Image Picked Yet.</p>}
                    {SelectedImage && <Image src={SelectedImage} alt="Selected Image" fill/>}
                </div>
            </div>
        </div>
    )

}