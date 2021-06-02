import React from 'react'
import { NewsInterface } from '../../../../interface/news.interface'
import './css/footer.css'


type NewsProps = {
  dataNews?: NewsInterface[]
}
export default function Footer({ dataNews }: NewsProps) {

  return (

    <div className="container-fluid container-footer">
      <div className="container main-footer">
        <div className="columns footer-left">
          <div className="column is-3 column-contact">
            <h4 >LIÊN HỆ</h4>
            <p>Công ty TNHH Thực Phẩm Plaza</p>
            <p>Mã số thuế: 0105041966</p>
            <p>Địa chỉ: Số 56 Linh Lang, Ba Đình, Hà Nội</p>
            <p>Hotline 1: 0989.330.683 (Ms. Hương)</p>
            <p>Hotline 2: 0969.789.683 (Ms. Chi)</p>
            <p>Hotline 3: 0983.631.015 (Ms. Thúy)</p>
            <p>Hotline 4: 0971.988.783 (Ms. Nhung) - Thucphamplaza ngõ 35 Cự Lộc, Thanh Xuân, Hà Nội</p>
            <p>Phòng Sale Online: 0243.244.4304</p>
            <p>Máy bàn CH Linh Lang : 0243.846.2288 - 0243.846.5279</p>
            <p>Customer Care: 0967.388.718</p>
            <p>Email: <a href="">support@thucphamplaza.com</a></p>
            <a href="http://online.gov.vn/Home/WebDetails/5975"><img src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png" alt="" /></a>
          </div>
          <div className="column is-3 column-news">
            <h4>TIN MỚI</h4>
            {
              dataNews?.map((item, index) =>
                <div key={item?.id} className="child-news">
                  <div className="khoi-date">
                    <p className={`date date${index + 1}`}>{item?.time_create}</p>
                  </div>
                  <div className="khoi-link">
                    <a className={`link-news news${index + 1}`}>{item?.title}</a>
                  </div>
                </div>
              )
            }
          </div>
          <div className="column is-3 column-tags">
            <h4>TAGS</h4>
            <div className={`khoi-tag tag1`}>
              <a href="">Bia Bỉ</a>
            </div>
            <div className={`khoi-tag tag2`}>
              <a href="">Bia Chimay</a>
            </div>
            <div className={`khoi-tag tag3`}>
              <a href="">Siro Monin</a>
            </div>
            <div className={`khoi-tag tag4`}>
              <a href="">Trà Ahmad</a>
            </div>

          </div>
          <div className="column form-signup">
            <span className="widget-title">ĐĂNG KÍ NHẬN TIN</span><br />
            <div className="is-divider small"></div>
            <div className="form-flat">
              <input type="email" name="your-email" placeholder="Email của bạn (required)" />
              <input type="submit" value="ĐĂNG KÝ" />
            </div>
          </div>

        </div>
      </div>
      <div className="container.is-widescreen footer-dark">
        <div className="container">
          <ul className="khoitren">
            <li><a href=""><i className="fab fa-cc-visa"></i></a></li>
            <li><a href=""><i className="fab fa-cc-paypal"></i></a></li>
            <li><a href=""><i className="fab fa-cc-stripe"></i></a></li>
            <li><a href=""><i className="fab fa-cc-mastercard"></i></a></li>
            <li><a href=""><i className="fab fa-cc-apple-pay"></i></a></li>
          </ul>
          <div className="columns khoigiua">
            <ul>
              <li><a href="">GIỚI THIỆU</a></li>
              <li><a href="">THỰC PHẨM PLAZA</a></li>
              <li><a href="">TIN TỨC</a></li>
              <li><a href="">LIÊN HỆ</a></li>
              <li><a href="">ĐẶT HÀNG, ĐỔI TRẢ & HOÀN TIỀN</a></li>
              <li><a href="">BẢO MẬT THÔNG TIN KHÁCH HÀNG</a></li>
              <li><a href="">HƯỚNG DẪN MUA HÀNG</a></li>
            </ul>
          </div>
          <div className="khoiduoi">
            <p>Copyright 2021 © <span>thucphamplaza.com</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
