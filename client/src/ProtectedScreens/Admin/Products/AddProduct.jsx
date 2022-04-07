import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../../Validations/yupSchema";
import { addProduct, updateProduct } from "../../../Redux/Products/Action";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(location?.state?.product?.url);

  // console.log(location?.state?.product);

  useEffect(() => {
    console.log("location ", location.state);
    // reset();
    // eslint-disable-next-line
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title:{
      longTitle: location?.state?.edit ? location?.state?.data?.title?.longTitle : "",
      shortTitle: location?.state?.edit ? location?.state?.data?.title?.shortTitle : "",},
      price: {
        mrp: location?.state?.edit ? location?.state?.data?.price?.mrp : "",
        cost: location?.state?.edit ? location?.state?.data?.price?.cost : "",
        discount: location?.state?.edit ? location?.state?.data?.price?.discount : "",
      },
      description: location?.state?.edit ? location?.state?.data?.description : "",
      url: location?.state?.edit ? location?.state?.data?.url : "",
      tagline: location?.state?.edit ? location?.state?.data?.tagline : "",
      discount: location?.state?.edit ? location?.state?.data?.discount : "",
      detailUrl: location?.state?.edit ? location?.state?.data?.detailUrl : "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.price.cost = data.price.mrp - (data.price.mrp * data.price.discount / 100);
    data.detailUrl = data.url;
    if (location?.state?.edit) {
      dispatch(updateProduct(location.state.data._id, data, navigate));
    } else {
      dispatch(addProduct(data));
    }
    // reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <h2>{location?.state?.edit ? "Edit Product" : "Add Product"}</h2>
            <div
              className="d-flex justify-content-center my-3"
              style={{ minHeight: "100px" }}
            >
              <img
                src={
                  location?.state?.data?.url ||
                  "https://img.icons8.com/clouds/100/000000/used-product.png"
                }
                alt="product"
                width="120px"
                onError={(e) =>
                (e.target.src =
                  "https://img.icons8.com/clouds/100/000000/used-product.png")
                }
              />
            </div>

          </Row>
          <Row className="mt-2 gx-3">
            {/* Title field */}
            <Col md={6}>
              <FloatingLabel label="Title">
                <Form.Control
                  {...register("title.longTitle")}
                  type="text"
                  placeholder="title"
                />
              </FloatingLabel>
              {errors.title?.longTitle && (
                <small className="text-danger">
                  {errors.title?.longTitle.message}
                </small>
              )}
            </Col>
             {/* Category field */}
             <Col md={6}>
              <FloatingLabel label="Category">
                <Form.Control
                  {...register("title.shortTitle")}
                  type="text"
                  placeholder="Category"
                />
              </FloatingLabel>
              <span className="text-danger">
                {errors.title?.shortTitle && errors.title?.shortTitle.message}
              </span>
            </Col>
          </Row>

          <Row className="mt-2 gx-3">
            {/* Price field */}
            <Col md={6}>
              <FloatingLabel label="mrp">
                <Form.Control
                  {...register("price.mrp")}
                  type="text"
                  placeholder="Product MRP"
                />
              </FloatingLabel>
              {errors.price?.mrp && (
                <small className="text-danger">
                  {errors.price?.mrp.message}
                </small>
              )}
            </Col>

            <Col md={6}>
              <FloatingLabel label="discount">
                <Form.Control
                  {...register("price.discount")}
                  type="text"
                  placeholder="Product Discount"
                />
              </FloatingLabel>
              {errors.price?.discount && (
                <small className="text-danger">
                  {errors.price?.discount.message}
                </small>
              )}
            </Col>

          </Row>
          <Row className="mt-2 gx-3">

            {console.log()}
            {/* Category field */}
            <Col md={6}>
              <FloatingLabel label="Discount Tag">
                <Form.Control
                  {...register("discount")}
                  type="text"
                  placeholder="Discount Message"
                />
              </FloatingLabel>
              <span className="text-danger">
                {errors.discount && errors.discount.message}
              </span>
            </Col>
            <Col md={6}>
              <FloatingLabel label="tag">
                <Form.Control
                  {...register("tagline")}
                  type="text"
                  placeholder="Product Tag Line"
                />
              </FloatingLabel>
              <span className="text-danger">
                {errors.tagline && errors.tagline.message}
              </span>
            </Col>
          </Row>
          <Row className="mt-2 gx-3">
            {/* Image field */}
            <Col md={12}>
              <FloatingLabel label="Image Url">
                <Form.Control
                  {...register("url")}
                  type="text"
                  placeholder="Image Url"
                  onChange={(e) => setImage(e.target.value)}
                />
              </FloatingLabel>
              {errors.url && (
                <small className="text-danger">
                  {errors.url.message}
                </small>
              )}
            </Col>
          </Row>

          <Row className="mt-2 gx-3">
            {/* Description field */}
            <Col md={12}>
              <FloatingLabel label="Description">
                <Form.Control
                  {...register("description")}
                  as="textarea"
                  placeholder="Description"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              {errors.description && (
                <small className="text-danger">
                  {errors.description.message}
                </small>
              )}
            </Col>
          </Row>
          <Row>
            <Col><Button className="m-2" variant="secondary" onClick={() => navigate('/admin/products')}>
              Back
            </Button>
              <Button className="m-2" variant="primary" type="submit">
                {location?.state?.edit ? "Edit" : "Add"}
              </Button>
            </Col>


          </Row>
        </Container>
        {/* </Modal.Body> */}
        {/* <Modal.Footer> */}

        {/* </Modal.Footer> */}
      </Form>
      {/* </Modal> */}
    </>
  );
};

export default AddProduct;
