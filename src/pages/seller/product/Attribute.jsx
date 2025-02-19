import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Flex, Form, Select } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";
import SelectCustom from "../../../components/inputs/Select";

function Attribute({ attributes, brands, control, brandName }) {
  const [maxSize, setMaxSize] = useState(9);
  const { Option } = Select;
  return (
    <>
      <Flex gap={10}>
        <Form
          style={{
            width: "90%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 10,
          }}
          // name="dynamic_form_item"
          initialValues={{ remember: true }}
          layout="horizontal"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Thương hiệu:">
            <SelectCustom
              keyField="brand_id"
              valueField="display_name"
              data={brands}
              name={brandName}
              control={control}
            />
          </Form.Item>
          {attributes.map(
            (attr, idx) =>
              idx < maxSize && (
                <Form.Item
                  colon={false}
                  label={
                    <span
                      style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {attr.display_name}
                    </span>
                  }
                  key={attr.attribute_id}
                >
                  <Controller
                    name={`product_attributes.${idx}.${attr.display_name}`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: "100%" }}
                        // mode="multiple"
                        placeholder={`Chọn ${attr.display_name}`}
                      >
                        {attr.children.map((item) => (
                          <Option key={item.value_id} value={item.value_id}>
                            {item.display_name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              )
          )}
        </Form>
      </Flex>
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
