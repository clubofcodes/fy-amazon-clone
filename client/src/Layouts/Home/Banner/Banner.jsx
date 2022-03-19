import Carousel from 'react-material-ui-carousel';
import './Banner.css';

export const Banner = () => {
    const bannerImgList = [
        "https://m.media-amazon.com/images/I/71eBXpqwYXL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71YyQch1rQL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81ypGyfK8mL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/91Rd9TYGhNL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81qFlA2dqjL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71DdKG7+jfL._SX3000_.jpg"
    ]

    return (
        <Carousel
            IndicatorIcon={false}
            autoPlay={true}
            animation="slide"
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            navButtonsProps={{
                style:{
                    backgroundColor:"transparent",
                    color:"white",
                    borderRadius:0,
                    marginTop:-22,
                    height:"104px",
                }
            }}
        >
            {
                bannerImgList.map((img, i) => (
                    <img src={img} alt="" className="banner_img" key={i} />
                ))
            }
        </Carousel>
    )
}
