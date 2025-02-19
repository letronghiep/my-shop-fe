import { PlusOutlined } from "@ant-design/icons";
import { Anchor, Cascader, Image, Typography, Upload } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css"; // Import styles
import { useNavigate } from "react-router-dom";
import { apiOrigin } from "~/constants";
import InputCustom from "../../../components/inputs/Input";
import RichText from "../../../components/inputs/RichText";
import { getAttributes } from "../../../services/attributes";
import { getBrand } from "../../../services/brand";
import { getCategoryByParentId } from "../../../services/category";
import { getVariations } from "../../../services/variations";
import Attribute from "./Attribute";
import FooterView from "./FooterView";
import Variation from "./Variation";
function ProductForm({
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  onSubmit,
  product,
}) {
  const { Title } = Typography;
  const { control, watch, setValue, handleSubmit, reset, getValues } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();
  
  // setup upload anh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [brands, setBrands] = useState();
  const [attributes, setAttributes] = useState();
  const [variations, setVariations] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = async ({ fileList: newFileList }) => {
    const newImages = newFileList.map((file) => {
      if (file.status === "done") {
        return file.response.metadata[0].thumb_url;
      }
    });
    setImages(newImages);
    setFileList(newFileList);
  };
  const handleCancel = () => {
    setImages([]);
    setFileList([]);
    setSelectedCategory([]);
    reset({
      ...getValues,
    });
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  // effect
  useEffect(() => {
    async function fetchingData() {
      try {
        const [categoriesData] = await Promise.all([getCategoryByParentId("")]);
        setCategories(categoriesData.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    fetchingData();
  }, []);
  function transformCategories(categories) {
    return categories.map((category) => ({
      value: category.category_id,
      label: category.category_name,
      children:
        category.children?.length > 0
          ? transformCategories(category.children)
          : undefined,
    }));
  }
  const options = useMemo(() => {
    return transformCategories(categories);
  }, [categories]);
  const handleChangeCategory = (value) => {
    setSelectedCategory(value);
  };
  useEffect(() => {
    if (selectedCategory.length > 0) {
      async function fetchingData() {
        try {
          const [brandsData, attributesData, variationsData] =
            await Promise.all([
              getBrand(selectedCategory.at(-1)),
              getAttributes(selectedCategory.at(-1)),
              getVariations(selectedCategory.at(-1)),
            ]);
          if (brandsData && attributesData && variationsData) {
            setBrands(brandsData.metadata);
            setAttributes(attributesData.metadata);
            setVariations(variationsData.metadata);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchingData();
    }
  }, [selectedCategory]);
  const setValueofFormData = useCallback(() => {
    // const defaultValues = product?.product_attributes.reduce((acc, item) => {
    //   acc[`attribute_${item.attribute_id}`] = item.value_id;
    //   return acc;
    // }, {});
    // reset(defaultValues);
    const variations = product.product_variations.map((variation) => {
      const convertedVariation = {
        [variation.name]: variation.options,
        images: variation.images,
      };
      return convertedVariation;
    });
    // reset(variations);
    setValue("product_variations", variations);
    setValue("product_category", product?.product_category ?? []);
    setSelectedCategory(product?.product_category ?? []);
    setValue("product_name", product?.product_name ?? "");
    setValue("product_description", product?.product_description ?? "");
    setValue("product_images", product?.product_images ?? []);
    setFileList(product?.product_images.map((image) => ({ url: image })));
    setValue("product_thumb", product?.product_thumb ?? "");
    setImages(product?.product_images);
    setValue("product_brand", product?.product_brand ?? "");
    setValue("product_attributes", product?.product_attributes ?? []);
    setValue("product_price", product?.price ?? "");
    setValue("product_variations", product?.product_variations ?? []);
  }, [product, setValue, reset]);
  useEffect(() => {
    if (product) setValueofFormData();
  }, [product, setValueofFormData]);
  useEffect(() => {
    const product_images = images.map((image) => image);
    setValue("product_images", product_images);
    setValue("product_thumb", product_images[0]);
  }, [images, setValue]);

  return (
    <>
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        <Anchor
          direction="horizontal"
          items={[
            {
              key: "basic-info",
              href: "#basic-info",
              title: "Thông tin cơ bản",
            },
            {
              key: "detail-info",
              href: "#detail-info",
              title: "Thông tin chi tiết",
            },
            {
              key: "sale-info",
              href: "#sale-info",
              title: "Thông tin bán hàng",
            },
            {
              key: "shipment-info",
              href: "#shipment-info",
              title: "Thông tin vận chuyển",
            },
            {
              key: "other-info",
              href: "#other-info",
              title: "Thông tin khác",
            },
          ]}
        />
      </div>
      <div className="">
        <div id="basic-info" className="bg-white p-4">
          <Title level={5}>Thông tin cơ bản</Title>
          <table className="w-full">
            <tr className="my-6 flex gap-x-4">
              <td colSpan={2} className="flex justify-end flex-1">
                <h4>Hình ảnh sản phẩm</h4>
              </td>
              <td className="flex-[6]">
                <Upload
                  action={`${apiOrigin}/upload/multiple`}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple={true}
                  name="files"
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    srcSet={previewImage}
                    width={300}
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => {
                        setPreviewOpen(visible);
                      },
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </td>
            </tr>
            <tr className="my-6 flex gap-x-4">
              <td colSpan={2} className="flex justify-end flex-1">
                <h4>Ảnh bìa</h4>
              </td>
              <td className="flex gap-x-4 flex-[6]">
                <Image
                  src={images[0] || ""}
                  width={100}
                  fallback="data:image/png;base64,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"
                />
                <ul className="text-xs max-w-[500px]">
                  <li data-v-2c557348="">Tải lên hình ảnh 1:1.</li>
                  <li data-v-2c557348="">
                    Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi
                    ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt
                    truy cập vào sản phẩm của bạn
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="my-6 flex gap-x-4">
              <td colSpan={2} className="flex justify-end flex-1">
                <h4>Tên sản phẩm</h4>
              </td>
              <td className="flex gap-x-4 flex-[6]">
                <InputCustom
                  control={control}
                  name="product_name"
                  label="Tên sản phẩm"
                />
              </td>
            </tr>
            <tr className="my-6 flex gap-x-4">
              <td colSpan={2} className="flex justify-end flex-1">
                <h4>Chọn danh mục</h4>
              </td>
              <td className="flex gap-x-4 flex-[6]">
                <Controller
                  control={control}
                  name="product_category"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Cascader
                        options={options}
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          field?.onChange(value);
                          handleChangeCategory(value);
                        }}
                        value={field?.value}
                        // value={selectedCategory}
                        placeholder="Chọn danh mục"
                      />
                      {error && <div className="error">{error.message}</div>}
                    </>
                  )}
                />
              </td>
            </tr>
            <tr className="my-6 flex gap-x-4">
              <td colSpan={2} className="flex justify-end flex-1">
                <h4>Mô tả</h4>
              </td>
              <td className="flex gap-x-4 flex-[6] h-[300px]">
                <RichText
                  style={{}}
                  control={control}
                  name="product_description"
                />
              </td>
            </tr>
          </table>
        </div>
        <div id="detail-info" className="bg-white p-4 my-4">
          <Title level={5}>Thông tin chi tiết</Title>
          <div>
            {selectedCategory.length > 0 && brands && attributes ? (
              <Attribute
                brandName="product_brand"
                brands={brands && brands.brand_list}
                attributes={attributes && attributes[0].attribute_list}
                control={control}
                setValue={setValue}
              />
            ) : (
              <p className="warning">
                Chọn danh mục trước khi điền thông tin bán hàng.
              </p>
            )}
          </div>
        </div>
        <div id="sale-info" className="bg-white p-4 my-4">
          <Title level={5}>Thông tin bán hàng</Title>
          {selectedCategory.length > 0 && brands && attributes ? (
            <Variation
              variations={variations && variations[0].tier_variation_list}
              watch={watch}
              setValue={setValue}
              // name="variations"
              control={control}
            />
          ) : (
            <p className="warning">
              Chọn danh mục trước khi điền thông tin bán hàng.
            </p>
          )}
        </div>
        <div
          id="shipment-info"
          style={{
            textAlign: "center",
            background: "#FFFBE9",
          }}
        />
        <div
          id="other-info"
          style={{
            textAlign: "center",
            background: "#FFFBE9",
          }}
        />
      </div>
      <FooterView
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onSubmit={handleSubmit(onSubmit)}
        secondaryAction={secondaryAction}
        cancelLabel="Hủy"
        onCancel={handleCancel}
      />
    </>
  );
}

export default ProductForm;
