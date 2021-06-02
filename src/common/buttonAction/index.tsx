import { useDispatch } from "react-redux"
import { ProductInterface } from "../../interface/product.interface"
import { notifiSuccess } from "../notification"


type ButtonProps = {
    data?: ProductInterface,
    count?: number,
    action?: string
}
export function ButtonAdd({ action, data, count }: ButtonProps): JSX.Element {
    const dispatch = useDispatch()
    return (
        <button className="button button-add is-danger" onMouseUp={() => notifiSuccess('Success', 'Product add to cart success')} onClick={() => {
            dispatch({ type: `${action}`, payload: data, amount: count })
        }}>THÊM VÀO GIỎ HÀNG</button>
    )
}