"use client"
import { fetchProductsID } from "@/app/redux/actions";
import { useEffect } from "react"
import { useAppDispatch,useAppSelector } from "@/app/utils/hooks";

const ProductsID = (props) => {
    const id = props.params.id
    const dispatch = useAppDispatch()
    const product = useAppSelector((state) => state.products.productsID)

    useEffect(() => {
        dispatch(fetchProductsID(id));

    }, [dispatch, id]);

    return (
        <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div>{product.price}</div>
            <div>{product.stock}</div>
        </>
    )
}
export default ProductsID