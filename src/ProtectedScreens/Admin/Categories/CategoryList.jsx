import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { getCategories } from "../../../Redux/Category/CategoryAction";

const CategoryList = () => {
  const categoryList = useSelector((state) => state.categoryData);
  const { categories, data } = categoryList;
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const outlet = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    outlet.selectCurTab('/admin/category');
    // if (category.length === 0) 
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      // dispatch(deleteCategory(id));
    }
  };

  return (
    <Container>
      {/* {console.log(categories, data)} */}
      <Row className="m-2">
        <Col>
          <h3>Category Data</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={()=> navigate('/admin/addcategory', {state:{name:'Add Category', edit:false}})}> <i className="bi bi-plus-square m-1"></i> Add Category </Button>
        </Col>
      </Row>
      <Row>
        <>
          <Table bordered hover responsive className="disp-product bg-white">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr className="align-middle" key={index}>
                  <td width="5%">{index + 1}</td>
                  <td width="80%" className="text-capitalize">
                    {item.category}
                  </td>
                  <td width="20%">
                    <div className="d-flex justify-content-evenly align-items-center actions">
                      <i className="bi bi-pencil-square fs-5" onClick={()=> navigate('/admin/addcategory',{state:{name:'Update Category', edit: true,cat:item}})} />
                      <i
                        className="bi bi-trash text-danger fs-5"
                        onClick={() => deleteHandler(item.id)}
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
              items={'users'}
              onChangePage={onChangePage}
            />
          </div>
        </>
      </Row>
    </Container>
  );
};

export default CategoryList;
