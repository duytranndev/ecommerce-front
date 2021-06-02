import { useEffect, useState } from "react";

type DetailProductProps = {
    children?: React.ReactNode,
    onChange?: any
}

export function ComponentAddToCart({ children, onChange }: DetailProductProps) {

    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        onChange && onChange(count)
    }, [count])

    return (
        <div className="buttons">
            <div className="button-input">
                <button type="button" onClick={() => setCount(count > 1 ? (count - 1) : 1)} className="button is-white">-</button>
                <input className="input-value" min="1" max="99" type="number" onChange={() => count} value={count} name="" id="" readOnly />
                <button type="button" onClick={() => setCount(count + 1)} className="button is-white">+</button>
            </div>
            {children}
        </div >
    )
}

