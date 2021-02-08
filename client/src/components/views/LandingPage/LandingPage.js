import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Col, Card, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import axios from "axios";
import { continents } from "./Sections/Datas";
import Checkbox from "./Sections/CheckBox";
function LandingPage() {
  const { Meta } = Card;

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    // 정석은 get인데 여기서는 post를 씀
    // body에 skip과 limit을 같이 보냄
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card hoverable cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    showFilteredResults(newFilters);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />
        </h2>
      </div>

      {/* filter */}

      {/* CheckBox */}
      <Checkbox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, "continents")}
      />

      {/* RadioBox */}

      {/* Search */}

      {/* Cards */}
      <br />
      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}
export default LandingPage;
