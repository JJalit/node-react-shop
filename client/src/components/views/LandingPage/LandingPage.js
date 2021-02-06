import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Col, Card, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";

import axios from "axios";
function LandingPage() {
  const { Meta } = Card;

  const [Products, setProducts] = useState([]);

  useEffect(() => {
    // 정석은 get인데 여기서는 post를 씀
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setProducts(response.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <img
              sytle={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${product.images[0]}`}
            />
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />
        </h2>
      </div>

      {/* filter */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
    </div>
  );
}
export default LandingPage;
