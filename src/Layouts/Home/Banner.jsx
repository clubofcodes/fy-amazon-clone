import Carousel from 'react-material-ui-carousel';
import './Banner.css';

export const Banner = () => {
    const bannerImgList = [
        "https://m.media-amazon.com/images/I/81qFlA2dqjL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/91Rd9TYGhNL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71YyQch1rQL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71DdKG7+jfL._SX3000_.jpg"
    ]

    return (
        <Carousel
            IndicatorIcon=""
        >
            {
                bannerImgList.map((img, i) => (
                    <img src={img} alt="" className="banner_img" key={i} />
                ))
            }
        </Carousel>
    )
}
