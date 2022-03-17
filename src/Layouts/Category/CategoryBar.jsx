import './CategoryBar.css'

export const CategoryBar = () => {
    return (
        <div className="category_main">
            <div className="category_data">
                <div className="left_data">
                    <p><i className="fas fa-shopping-cart"></i> All</p>
                    <p>Mobiles</p>
                    <p>Best Sellers</p>
                    <p>Fashion</p>
                    <p>Customer Service</p>
                    <p>Electronics</p>
                    <p>Prime</p>
                    <p>Today's Deals</p>
                    <p>Amazon Pay</p>
                </div>
                <div className="right_data">
                    <a href="https://www.primevideo.com/?ref_=dvm_crs_in_s_gw_swm_dk_np_notimeto" target="_blank"><img src="./Assets/img/categorybar_offer.jpg" alt="navdata" /></a>
                </div>
            </div>
        </div>
    )
}
