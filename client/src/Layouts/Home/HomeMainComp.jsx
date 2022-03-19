import { Banner } from './Banner/Banner';
import './Home.css';
import { ProductSlider } from './Slider/ProductSlider';
// import { products, products2, products3 } from "../../Assets/files/productData";
import { getProducts } from "../../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';


export const HomeMainComp = () => {

    const cardBodyList = [
        { text: 'Professional tools', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2018/QC/Tools1x._SY116_CB424026090_.jpg' },
        { text: 'Measuring instruments', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2021/BAU_GW_Graphics/PCQC/2._SY116_CB643952439_.jpg' },
        { text: 'Cleaning supplies', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2021/BAU_GW_Graphics/PCQC/1._SY116_CB643952439_.jpg' },
        { text: 'Medical supplies', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2018/QC/med1x._SY116_CB424026091_.jpg' },
        { text: 'Flight tickets', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img16/AmazonPayTravels/November/GWPercolate/Flight_186x116._SY116_CB653435429_.jpg' },
        { text: 'Bus tickets', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img16/AmazonPayTravels/November/GWPercolate/Bus_186x116._SY116_CB653435429_.jpg' },
        { text: 'Train tickets', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img16/AmazonPayTravels/November/GWPercolate/Train_186x116._SY116_CB653435429_.jpg' },
        { text: 'Essential travel products', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img16/AmazonPayTravels/November/GWPercolate/essential_186x116._SY116_CB653435429_.jpg' },
        { text: 'Cleaning accessories', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Glasscare1X._SY116_CB410830553_.jpg' },
        { text: 'Tyre & rim care', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Rim_tyrecare1x._SY116_CB410830552_.jpg' },
        { text: 'Helmets', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vega_helmet_186x116._SY116_CB405090404_.jpg' },
        { text: 'Vacuum cleaner', img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vaccum1x._SY116_CB410830552_.jpg' },
    ]

    const { products } = useSelector(state => state.getproductsdata);

    console.log("Home: ", products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    return (
        <div className="home_section">

            <div className="banner_part">
                <Banner />
            </div>

            <div className="row mx-0 justify-content-evenly">
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Professional tools, testing &amp; more</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i < 4) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/b?node=12414705031&pf_rd_r=X4VGXBDAT5WMBM2S0TJJ&pf_rd_p=47d02811-c3b6-4046-96fa-b28a4288a4a7&pd_rd_r=e4da1f29-b11a-4ed8-a666-e2a64a0c6b0a&pd_rd_w=kY1oA&pd_rd_wg=fBWlZ&ref_=pd_gw_unk">Explore All</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Amazon Pay | Book your travel tickets</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i >= 4 && i <= 7) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/gp/sva/dashboard?ref_=gw_apay_acko_qcpc&pf_rd_r=HBY2EQGFPMK9DF32T0N5&pf_rd_p=dec4af99-e62d-4c85-8275-9e13a6c47b32&pd_rd_r=ba8653dc-649a-4d2c-89f5-322119aacc44&pd_rd_w=INHX3&pd_rd_wg=qICUT">Explore more from amazon pay</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Automotive essentials | Up to 60% off</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i > 7) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/b?ie=UTF8&node=4772060031&pf_rd_r=HBY2EQGFPMK9DF32T0N5&pf_rd_p=9ff36f11-82d6-4600-a8fb-e52bb32e171c&pd_rd_r=ba8653dc-649a-4d2c-89f5-322119aacc44&pd_rd_w=VGvYN&pd_rd_wg=qICUT&ref_=pd_gw_unk">See more</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Pay your credit card bills on Amazon</h5>
                        <div className="card my-3">
                            <div className="card-body p-0">
                                <img className="w-100" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/DesktopGateway_CategoryCard_379x304_CCBP._SY304_CB413372299_.jpg" alt="" />
                            </div>
                        </div>
                        <a href="#">Pay Now</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Professional tools, testing &amp; more</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i < 4) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/b?node=12414705031&pf_rd_r=X4VGXBDAT5WMBM2S0TJJ&pf_rd_p=47d02811-c3b6-4046-96fa-b28a4288a4a7&pd_rd_r=e4da1f29-b11a-4ed8-a666-e2a64a0c6b0a&pd_rd_w=kY1oA&pd_rd_wg=fBWlZ&ref_=pd_gw_unk">Explore All</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Amazon Pay | Book your travel tickets</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i >= 4 && i <= 7) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/gp/sva/dashboard?ref_=gw_apay_acko_qcpc&pf_rd_r=HBY2EQGFPMK9DF32T0N5&pf_rd_p=dec4af99-e62d-4c85-8275-9e13a6c47b32&pd_rd_r=ba8653dc-649a-4d2c-89f5-322119aacc44&pd_rd_w=INHX3&pd_rd_wg=qICUT">Explore more from amazon pay</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Automotive essentials | Up to 60% off</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i > 7) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/b?ie=UTF8&node=4772060031&pf_rd_r=HBY2EQGFPMK9DF32T0N5&pf_rd_p=9ff36f11-82d6-4600-a8fb-e52bb32e171c&pd_rd_r=ba8653dc-649a-4d2c-89f5-322119aacc44&pd_rd_w=VGvYN&pd_rd_wg=qICUT&ref_=pd_gw_unk">See more</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Pay your credit card bills on Amazon</h5>
                        <div className="card my-3">
                            <div className="card-body p-0">
                                <img className="w-100" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/DesktopGateway_CategoryCard_379x304_CCBP._SY304_CB413372299_.jpg" alt="" />
                            </div>
                        </div>
                        <a href="#">Pay Now</a>
                    </div>
                </div>
                <div className="col-sm-3 category_card card my-3">
                    <div className="card-body">
                        <h5 className="">Professional tools, testing &amp; more</h5>
                        <div className="row my-3">
                            {cardBodyList.map((data, i) => (
                                (i < 4) && <div className="col-sm-6" key={i}>
                                    <img className="w-100" src={data.img} alt="" />
                                    <p style={{ fontSize: 'x-small' }}>{data.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.amazon.in/b?node=12414705031&pf_rd_r=X4VGXBDAT5WMBM2S0TJJ&pf_rd_p=47d02811-c3b6-4046-96fa-b28a4288a4a7&pd_rd_r=e4da1f29-b11a-4ed8-a666-e2a64a0c6b0a&pd_rd_w=kY1oA&pd_rd_wg=fBWlZ&ref_=pd_gw_unk">Explore All</a>
                    </div>
                </div>
            </div>

            <div className="row mx-0 justify-content-evenly mb-3">
                <div className="col-sm-9 px-2">
                    <ProductSlider pTitle="Today’s Deals" pLinkText="See all deals" pData={products}  />
                </div>
                <div className="col-sm-3 py-2 d-flex align-self-stretch px-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="">Festive latest launches</h5>
                            <div className="card">
                                <div className="card-body p-0">
                                    <img className="w-100" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="Addvertise" height="250" />
                                </div>
                            </div>
                            <a href="#">See More</a>
                        </div>
                    </div>
                </div>
            </div>

            <ProductSlider
                pTitle="Up to 50% off on electronic products | Small businesses"
                pLinkText="See all offers"
                pData={products}
            />

            <p className="mt-4"></p>
            <ProductSlider
                pTitle="Up to 50% off on kitchen &amp; dining products | Small businesses"
                pLinkText="See all offers"
                pData={products}
            />
        </div>
    )
}
