import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";
function FileUpload(props) {
  const [Images, setImages] = useState([]); // array로 하는이유는 여러개를 넣어주려고

  const dropHandler = (files) => {
    // formData는 파일정보, config는 파일형식
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    // 이미지를 보낼 때 같이 보내야함
    axios
      .post("/api/product/image", formData, config) //이게 보낸거임
      // backend에서 frontend로 보낼떄 저장한 파일 정보를 response에 담아서 받아옴
      .then((response) => {
        if (response.data.success) {
          setImages([...Images, response.data.filePath]); //...연산자는 값의 모든 값을 나타냄
          props.refreshFunction([...Images, response.data.filePath]);
        } else {
          //실패시
          alert("파일을 저장하는데 실패했습니다.");
        }
      });
  };

  // 삭제하는 방법
  // ---중간만 삭제하는 방법 구상하기---
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* 1. dropzone에서 backend로 파일 전달 */}
      {/* 2. backend에서 파일 저장 */}
      {/* 3. frontend로 파일저장 정보 전달 */}
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {/* Images에 있는 response.data.filepath의 것들을 map으로 나열 */}
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler()} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "220px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
