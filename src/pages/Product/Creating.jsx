import { useSelector } from 'react-redux'
import styles from './Creating.module.scss'

import React, { useEffect, useState } from 'react'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import NotAllowed from '../Errors/NotAllowed'
import { useProducts } from '../../hooks/useProducts'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories'
import useErrors from '../../hooks/useErrors'
import UploadImageSvg from '../../components/Icons/UploadImageSvg'
import { useAdmin } from '../../hooks/useAdmin'

const Creating = () => {
    const {user} = useSelector(state=>state.auth),
        {cookie:token} = useCookiesCustom('user'),
        {getProduct} = useProducts(),
        {createProduct, editProduct} = useAdmin(),
        {pid} = useParams(),
        {categories} = useCategories(),
        {dispatchGlobalError} = useErrors(),
        navigate = useNavigate()

    const [Product, setProduct] = useState(null),
        [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [price, setPrice] = useState(1),
        [draftImage, setDraftImage] = useState(''),

        [imageFile, setImageFile] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()


        const product = {
            name, description, category, price
        }

        const body = new FormData()
        if (imageFile) body.append('image', imageFile)
        body.append('product', JSON.stringify(product))

        if(pid) editProduct(token, body, pid).then(res=>{navigate(`/product/${pid}`)})
        else createProduct(token, body).then(res=>{navigate(`/product/${res.pid}`)})

    },
    handleImage = (e)=>{
        const files = e.target.files
        if (!files || files.length == 0) return
        
        let image = files[0]
        if (!image.name.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|tif|heif|heic|ico|psd)$/i)) {
            dispatchGlobalError('Tipo de imagem inválida')
            return
        }
        setDraftImage(URL.createObjectURL(image))
        setImageFile(image)
    }
    
    useEffect(()=>{
        if(pid) getProduct(pid).then(res=>setProduct(res))
    },[pid])
    useEffect(()=>{
        if(Product){
            setName(Product?.name)
            setDescription(Product?.description)
            setCategory(Product?.category)
            setPrice(Product?.price)
            setDraftImage(Product?.productImage == 'default' ? '' : Product?.productImage)
        }
    },[Product])

    if(!user?.admin) return <NotAllowed/>
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h3>Criar/Editar Produto</h3>
                <form onSubmit={handleSubmit}>

                    <div className={styles.image_container}>
                        <input type="file" id="imageProduct" onChange={handleImage} accept='image/*'/>
                        <label htmlFor="imageProduct">
                            <span>
                                {draftImage && <img src={draftImage} alt="draft-image"/>}
                                {!draftImage && <UploadImageSvg/>}
                            </span>
                        </label>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder='Nome do produto que você esta criando' 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}    
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Descrição</label>
                        <textarea 
                            id="desc" 
                            placeholder='Descreva seu produto aqui.'
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="category">Categoria</label>
                        <select id="category" value={category} onChange={e=>setCategory(e.target.value)} required> 
                            <option value="" disabled>Escolha a categoria</option>
                            {categories.map((categorie)=>(
                                <option key={categorie} value={categorie}>{categorie}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="preco">Preço</label>
                        <input 
                            type="number" 
                            id="preco" 
                            name="preco" 
                            min="0.01" 
                            step="0.01" 
                            required
                            value={price}
                            onChange={e=>setPrice(e.target.value)}
                            ></input>
                    </div>
                    
                    <div className={styles.submit_container}>
                        <button type='submit'>Criar Produto</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Creating