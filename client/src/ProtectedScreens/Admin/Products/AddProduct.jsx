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

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(location?.state?.product?.url);
  
  // console.log(location?.state?.product);

  useEffect(() => {
    console.log("location ",location.state);
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
      title: location?.state?.edit ? location?.state?.data?.title?.longTitle : "",
      price: location?.state?.edit ? location?.state?.data?.price?.mrp : "",
      category: location?.state?.edit ? location?.state?.data?.category : "",
      description: location?.state?.edit ? location?.state?.data?.description : "",
      image: location?.state?.edit ? location?.state?.data?.url : "",
    },
  });

  const handleClose = () => {
    reset();
    setShow(false);
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (location?.state?.edit) {
      dispatch(updateProduct(product.id, data));
    } else {
      // dispatch(addProduct(data));
    }
    reset();
    handleClose();
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
                image ||
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
            <Col md={12}>
              <FloatingLabel label="Title">
                <Form.Control
                  {...register("title")}
                  type="text"
                  placeholder="title"
                />
              </FloatingLabel>
              {errors.title && (
                <small className="text-danger">
                  {errors.title.message}
                </small>
              )}
            </Col>
          </Row>

          <Row className="mt-2 gx-3">
            {/* Price field */}
            <Col md={6}>
              <FloatingLabel label="Price">
                <Form.Control
                  {...register("price")}
                  type="text"
                  placeholder="Price"
                />
              </FloatingLabel>
              {errors.price && (
                <small className="text-danger">
                  {errors.price.message}
                </small>
              )}
            </Col>

            {/* Category field */}
            <Col md={6}>
              <FloatingLabel label="Category">
                <Form.Select {...register("category")}>
                  <option>Select Category</option>
                  {/* {categories.map((category, index) => (
                        <option value={category} key={index}>
                          {category[0].toUpperCase()}
                          {category.slice(1)}
                        </option>
                      ))} */}
                </Form.Select>
              </FloatingLabel>
              <span className="text-danger">
                {errors.category && errors.category.message}
              </span>
            </Col>
          </Row>

          <Row className="mt-2 gx-3">
            {/* Image field */}
            <Col md={12}>
              <FloatingLabel label="Image Url">
                <Form.Control
                  {...register("image")}
                  type="text"
                  placeholder="Image Url"
                  onChange={(e) => setImage(e.target.value)}
                />
              </FloatingLabel>
              {errors.image && (
                <small className="text-danger">
                  {errors.image.message}
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
            <Col><Button className="m-2" variant="secondary" onClick={()=>navigate('/admin/products')}>
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
