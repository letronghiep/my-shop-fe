import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Col, Flex, Row, Select } from "antd";
import { useState } from "react";
import SelectCustom from "../../../components/inputs/Select";

function Attribute({ attributes, brands, control, attrName, brandName }) {
  const { Option } = Select;
  const [maxSize, setMaxSize] = useState(9);
  return (
    <>
      <Row gap={20} align="middle" justify="space-around">
        <Col
          span={10}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Flex gap={10}>
            <label
              htmlFor="attribute"
              className="flex-1 max-w-[150px] flex justify-end"
            >
              <span className="text-orange-500">* </span>{" "}
              <span className="ml-1">Thương hiệu:</span>
            </label>
            <SelectCustom
              keyField="brand_id"
              valueField="display_name"
              data={brands}
              name={brandName}
              className="flex-[2]"
              control={control}
            />
              {/* {brands.map((brand) => (
                <Option key={brand.brand_id} value={brand.display_name}>
                  {brand.display_name}
                </Option>
              ))} */}
          </Flex>
        </Col>
        {attributes.map(
          (attr, idx) =>
            idx < maxSize && (
              <Col
                span={10}
                key={attr.attribute_id}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <Flex gap={10}>
                  <label
                    key={attr.attribute_id}
                    className="flex-1 max-w-[150px] flex justify-end"
                    htmlFor={attr.attribute_id}
                  >
                    {attr.display_name}
                  </label>
                  <SelectCustom
                    keyField="attribute_id"
                    valueField="display_name"
                    data={attr.children}
                    id={attr.attribute_id}
                    className="flex-[2]"
                    control={control}
                    name={attrName}
                  />
                    {/* {attr.children.map((option) => (
                      <Option
                        key={option.attribute_id}
                        id={attr.attribute_id}
                        value={option.value_id}
                      >
                        {option.display_name}
                      </Option>
                    ))} */}
                </Flex>
              </Col>
            )
        )}
      </Row>
      {maxSize < attributes.length ? (
        <p
          onClick={() => setMaxSize(attributes.length)}
          className="ml-[200px] text-blue-400 cursor-pointer hover:underline"
        >
          Hiển thị đầy đủ danh sách
          <DownOutlined />
        </p>
      ) : (
        <p
          onClick={() => setMaxSize(9)}
          className="ml-[200px] text-blue-400 cursor-pointer hover:underline"
        >
          Rút gọn danh sách <UpOutlined />
        </p>
      )}
    </>
  );
}

export default Attribute;
