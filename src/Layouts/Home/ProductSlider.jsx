import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import "./ProductSlider.css";
import { useState } from "react";

export const ProductSlider = ({ pTitle, pLinkText, pData }) => {

    const [isHover, setIsHover] = useState(false);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    return (
        <div className="products_section" onMouseEnter={()=>setIsHover(!isHover)} onMouseLeave={()=>setIsHover(!isHover)}>
            <div className="products_deal mt-0">
                <h3 className="mb-0">{pTitle} <small style={{ fontSize: '14px' }}><a href="#" className="mx-2">{pLinkText}</a></small></h3>
                <button className="view_btn">View All</button>
            </div>

            <Divider />

            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={true}
                swipeable={true}
                arrows={isHover}
                showDots={false}
                centerMode={false}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {
                    pData.map((product, index) => (
                        <div className="products_items pb-4" key={index} >
                            <div className="product_img">
                                <img src={product.url} alt={product.id} />
                            </div>
                            <p className="products_name">{product.title.shortTitle}</p>
                            <p className="products_offer mt-0">₹{product.price.mrp}&nbsp;({product.discount})</p>
                            <p className="products_explore mt-0">{product.tagline && product.tagline}</p>
                        </div>
                    ))
                }

            </Carousel>
        </div>
    )
}



