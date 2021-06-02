import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import "./index.css"

function NotFound() {
    return (
        <div className="notfound_page">
            <div>
                {/* https://letsflytravel.com/404.jpg */}
                <img src="https://hri.com.vn/wp-content/uploads/2020/06/1-1.jpg" alt="Page not found" className="notfound_image" />
                <Link to='/' className="notfound_backtohome">Quay về trang chủ</Link>
            </div>
        </div>
    )
}
export default memo(NotFound)
