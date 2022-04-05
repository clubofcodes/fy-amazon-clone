import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../../Redux/Products/ProductActions";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../../../Components/Loading";
import Message from "../../../Components/Message";
import AddCategory from "./AddCategory";
import Pagination from "../Components/Pagination";
import { useOutletContext } from "react-router-dom";

const CategoryList = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const outlet = useOutletContext()

  useEffect(() => {
    outlet.selectCurTab('/admin/categories');
    if (categories.length === 0) dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <Container>
      <Row className="m-2">
        <Col>
          <h3>Category Data</h3>
        </Col>
        <Col className="text-end">
          <AddCategory
            Btn={
              <Button variant="primary">
                <i className="bi bi-plus-square m-1"></i> Add Category
              </Button>
            }
          />
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loading />
        ) : categories.length === 0 ? (
          <Message variant="danger">
            <i className="fa fa-warning text-danger" />
            {"  "}Sorry, No Data Found!
          </Message>
        ) : error ? (
          <Message variant="danger">
            <i className="fa fa-warning text-danger" />
            {"  "}
            {error}
          </Message>
        ) : (
          <>
            <Table bordered hover responsive className="disp-product bg-white">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((category, index) => (
                  <tr className="align-middle" key={index}>
                    <td>{index + 1}</td>
                    <td width="5%">{index + 1}</td>
                    <td width="80%" className="text-capitalize">
                      {category.name}
                    </td>
                    <td width="20%">
                      <div className="d-flex justify-content-evenly align-items-center actions">
                        <AddCategory
                          Btn={<i className="bi bi-pencil-square fs-5" />}
                          edit={true}
                          cat={category}
                        />
                        <i
                          className="bi bi-trash text-danger fs-5"
                          onClick={() => deleteHandler(category.id)}
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
                items={categories.map((category, index) => ({
                  name: category,
                  id: index,
                }))}
                onChangePage={onChangePage}
              />
            </div>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CategoryList;
