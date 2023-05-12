import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ShopCard from "../components/shop/ShopCard";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import axios from "axios";


function Shop() {

  const [sizePage, setSizePage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);


  const CATEGORY_API = process.env.REACT_APP_FETCH_API + `/categorys`;
  useEffect(() => {
    axios
    .get(`${CATEGORY_API}`)
    .then(res => {
        setCategory(res.data.content)
    })
    .catch(err => {console.log(err)
    })
  }, []);


  //Cập nhật lại size
  function handleSizeChange(event) {
    setSizePage(event.target.value);
    setCurrentPage(0);
  }

  //Cập nhật lại số trang hiện tại
  function changePageNumber(page) {
    setCurrentPage(page);
  };

 
  const checkbokHandler = (event) => {
    var updatedList = [...checkedCategory];
    if (event.target.checked) {
      updatedList = [...checkedCategory, event.target.value];
    } else {
      updatedList.splice(checkedCategory.indexOf(event.target.value), 1);
      setCurrentPage(0);
    }
    setCheckedCategory(updatedList);
  };



  console.log(checkedCategory)
  //Phân trang
  function contentPageNumber() {
    let content = []
    for (let i = 0; i < totalPages; i++) {
      content.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <Link className="page-link" onClick={() => changePageNumber(i)}>
            {i+1}
          </Link>
        </li>
      )
    }
    return content;
  }

  return (
    <>
    <Layout>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Category</h5>
                    <div className="checkbox-container">

                    {category.map((item) => (
                      <label className="containerss" key={item.name}>
                        {item.name}
                        <input
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          onChange={checkbokHandler} 
                        />
                        <span className="checkmark"/>
                      </label>
                    ))}

                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Brand</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Fancy Feast
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Gentle Giants
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Purina Pro Plan
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Stella &amp; Chewy's
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Pet Dreams
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Health Consideration</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Brain Development
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Bladder
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Allergies
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Bone Development
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Dehydration
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Flavor</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Beef
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Chicken
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Fish
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Duck
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Other
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row mb-50">
                <div className="col-lg-12">
                  <div className="multiselect-bar">
                    <h6>shop</h6>
                    <div className="multiselect-area">
                      <div className="single-select">
                        <span>Show</span>
                        <select
                          className="defult-select-drowpown"
                          id="color-dropdown"
                          onChange={handleSizeChange}
                        >
                          <option name="9" value={"9"} >9</option>
                          <option name="12" value={"12"} >12</option>
                          <option name="15" value={"15"} >15</option>
                          <option name="18" value={"18"} >18</option>
                          <option name="21" value={"21"} >21</option>
                        </select>
                      </div>
                      <div className="single-select two">
                        <select
                          style={{ outline: "none" }}
                          className="defult-select-drowpown"
                          id="eyes-dropdown"
                        >
                          <option>Default</option>
                          <option>Grid</option>
                          <option>Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                <ShopCard sizePages={sizePage} currentPage={currentPage} setTotalPages={setTotalPages} checkedCategory={checkedCategory}/>
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">

                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                          <Link className="page-link" onClick={() => changePageNumber(currentPage - 1)}>
                            <i className="bi bi-arrow-left-short" />
                          </Link>
                        </li>
                        {contentPageNumber()}
                        <li className={`page-item ${currentPage === (totalPages - 1) ? 'disabled' : ''}`}>
                          <Link className="page-link" onClick={() => changePageNumber(currentPage + 1)}>
                            <i className="bi bi-arrow-right-short" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
                    }

export default Shop;
