import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import AddProduct from "./AddProduct";
import { getProducts } from "../../../Redux/Actions/Action";

const ProductList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.getproductsdata);
  const { products } = productList;
  const [filterData, setFilterData] = useState([]);

  const outlet = useOutletContext()
  useEffect(() => {
    outlet.selectCurTab('/admin/products');
    // props.selectCurrTab('/admin/products');
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // eslint-disable-next-line
  }, []);
  const deleteHandler = (id, category) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      // dispatch(deleteProduct(id, category));
    }
  };
  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };
  return (
    <Container>
      {console.log("pro ", products)}
      <Row className="m-2">
        <Col>
          <h3>Products Data</h3>
        </Col>
        <Col className="text-end">
          {/* <AddProduct
            Btn={ */}
          <Button variant="primary" onClick={() => navigate('/admin/addproduct',{state:{edit:false}})}>
            <i className="bi bi-plus-square m-1"></i> Add Product
          </Button>
          {/* }
          /> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover responsive className="disp-product bg-white">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>ID</th>
                <th>Image</th>
                <th>Category</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((product, index) => (
                <tr className="align-middle" key={index}>
                  <td width='4%'>{index + 1}</td>
                  <td width="4%">{product?.id}</td>
                  <td width="20%" className=" text-center">
                    <img
                      className="w-50 border border-1"
                      src={product?.url}
                      alt="product logo"
                    />{" "}
                  </td>
                  <td width="20%" > <span >{product?.title?.shortTitle}</span> </td>
                  <td width="20%" > <span >{product?.title?.longTitle.length > 15 ? product?.title?.longTitle.substring(0, 15) + "..." : product?.title?.longTitle}</span> </td>
                  <td width="5%">{product?.price?.mrp}</td>
                  <td width="20%">{product?.description.length > 15 ? product?.description.substring(0, 15) + "..." : product?.description}</td>
                  {/* <td width="25%">
                      {product?.description.length > 100
                        ? product?.description.substring(0, 100) + "..."
                        : product?.description}
                    </td>
                  <td width="10%" className="text-capitalize">
                    {product?.category}
                  </td>*/}
                  <td width="15%">
                    <div className="d-flex justify-content-evenly align-items-center actions">
                      <i className="bi bi-pencil-square fs-5" onClick={()=>navigate('/admin/addproduct',{state:{edit:true, data:product}})}></i>
                      <i
                        className="bi bi-trash text-danger fs-5"
                        onClick={() =>
                          deleteHandler(product.id, product.category)
                        }
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center d-flex justify-content-center">
            <Pagination
              pageSize={10}
              items={products}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
