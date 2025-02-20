import {
  Breadcrumb,
  Button,
  InputNumber,
  Rate,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import ProductSlide from "../components/product/product-slide";
import ProductVariation from "../components/product/product-variations";
import { validateFormMoney } from "../helpers";
import { getAllCommentForProduct } from "../services/comment";
import { getInfoProduct, getRelatedProducts } from "../services/product";

function ProductInfo() {
  const { product_slug } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);

  const increase = () => setProductQuantity(productQuantity + 1);
  const decrease = () =>
    setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 1);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getInfoProduct(product_slug);
        setProduct(response.metadata);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [product_slug]);
  useEffect(() => {
    if (product) {
      // Fetch comments for the product from API and set them to state.
      async function fetchData() {
        try {
          const [commentData, relatedData] = await Promise.all([
            getAllCommentForProduct(product._id),
            getRelatedProducts(product._id),
          ]);
          setComments(commentData.metadata);
          setRelatedProducts(relatedData.metadata);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [product]);
  const breadcrumbs = useMemo(() => {
    if (!product) return [];
    if (product)
      return product.product_category.map((category) => ({
        path: `/category/${category.category_id}`,
        title: category.category_name,
      }));
  }, [product]);
  const selectedCombination = Object.values(selectedOptions).join(", ") || "";
  const product_stock = useMemo(() => {
    if (!product) return 0;
    const foundModel = product.product_models.find(
      (model) => model.sku_name === selectedCombination
    );
    if (foundModel) return foundModel.sku_stock;
    else return product.product_quantity;
  }, [selectedCombination]);
  if (!product) return <Skeleton />;
  return (
    <div>
      <Breadcrumb
        items={[
          {
            path: "/",
            title: "Trang chủ",
          },
          ...breadcrumbs,
          {
            path: `/${product_slug}`,
            title: product.product_name,
          },

          // Add more breadcrumbs as needed for the product page.
        ]}
      />
      <div className="grid grid-cols-12 gap-6 my-4 p-4 bg-white">
        <div className="col-span-4">
          <ImageCarousel
            images={product.product_images}
            width={440}
            height={440}
          />
        </div>
        <div className="col-span-8">
          <h2 className="text-xl mt-2 mb-2">{product.product_name}</h2>
          <div className="my-4 rating flex items-center gap-x-2">
            <div className="px-3 border-r border-gray-500">
              <span className=" mr-2 ">
                {product.product_rattingAvg.toFixed(1).toLocaleString("en-UK")}
              </span>
              <Rate
                value={product.product_rattingAvg}
                allowHalf
                disabled
                style={{
                  fontSize: "12px",
                }}
              />
            </div>
            <div className="px-3 border-r border-gray-500">
              <span className="text-sm text-gray-400">
                {comments?.length && comments.length} Đánh giá
              </span>
            </div>
            <div className="px-3">
              <span className="text-sm text-gray-400">
                {product.product_sold} đã bán
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-4 mb-4 p-4 bg-neutral-200/50">
            {product.product_seller < product.product_price ? (
              <>
                <p className="text-3xl text-red-500 font-semibold">
                  {validateFormMoney(product.product_seller)}{" "}
                  <sup>
                    <u>đ</u>
                  </sup>
                </p>
                <del className="text-base text-gray-400">
                  {validateFormMoney(product.product_price)}{" "}
                  <sup>
                    <u>đ</u>
                  </sup>
                </del>
                <p className="p-1 text-sm font-bold bg-red-100/70 text-red-500">
                  -
                  {Math.floor(
                    ((product.product_price - product.product_seller) /
                      product.product_price) *
                      100
                  )}
                  %
                </p>
              </>
            ) : (
              <p className="text-xl">
                {validateFormMoney(product.product_price)}{" "}
                <sup>
                  <u>đ</u>
                </sup>
              </p>
            )}
          </div>
          <ProductVariation
            variations={product.product_variations}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          {/* <p>Bảng quy đổi kích thước</p> */}
          <div className="my-6 flex items-center">
            <span className="w-[100px]">Số lượng: </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #d9d9d9",
                width: "120px",
                justifyContent: "space-between",
              }}
            >
              <Button type="text" onClick={decrease} style={{ border: "none" }}>
                -
              </Button>
              <InputNumber
                value={productQuantity}
                onChange={setProductQuantity}
                min={1}
                max={product_stock}
                controls={false} // Ẩn nút tăng giảm mặc định
                style={{ textAlign: "center", border: "none", width: "40px" }}
              />
              <Button type="text" onClick={increase} style={{ border: "none" }}>
                +
              </Button>
            </div>
            <p className="ml-4 text-sm text-neutral-600/70">{product_stock} Sản phẩm có sẵn</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-7 my-4">
        <ProductSlide products={relatedProducts} title="Sản phẩm liên quan" />
      </div>
      <div className="bg-white p-7 my-4">
        <Typography.Title
          level={4}
          style={{
            textTransform: "uppercase",
          }}
        >
          Chi tiết sản phẩm
        </Typography.Title>
        <div>
          <table className="w-full">
            <tbody>
              {Object.keys(product.product_attributes).map((key) => (
                <tr key={key} className="mb-3 flex gap-x-4 py-2 px-2 text-base">
                  <td
                    colSpan={4}
                    className="flex justify-start  items-center min-w-[120px] max-w-[240px]"
                  >
                    <p className="justify-start flex text-gray-600/70">
                      {key}:
                    </p>
                  </td>
                  <td colSpan={2} className="flex items-center">
                    <p className="justify-start flex">
                      {product.product_attributes[key]}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Typography.Title
            level={4}
            style={{
              textTransform: "uppercase",
            }}
          >
            Mô tả sản phẩm
          </Typography.Title>
          <div
            dangerouslySetInnerHTML={{ __html: product.product_description }}
          />
        </div>
      </div>
      <div className="bg-white p-7 my-4">
        <Typography.Title
          level={4}
          style={{
            textTransform: "uppercase",
          }}
        >
          Đánh giá sản phẩm
        </Typography.Title>
          
        <div className="flex flex-col gap-y-4"></div>
      </div>
    </div>
  );
}

export default ProductInfo;
