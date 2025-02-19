import "react-quill/dist/quill.snow.css"; // Import styles
import ProductForm from "./ProductForm";
import { createProduct } from "~/services/product";
import { notification } from "antd";

function ProductCreatePage() {
  const onSubmit = async (data) => {
    console.log(data);
    const submitData = {
      ...data,
      product_price: parseFloat(
        data.sku_list?.length ? data.sku_list[0].price : data.product_price
      ),
      product_quantity: parseInt(
        data.sku_list?.length
          ? data.sku_list.reduce(
              (total, sku) => (total += parseInt(sku.stock)),
              0
            )
          : data.product_quantity
      ),
    };
    console.log(submitData);
    const res = await createProduct(submitData);
    if (res.status === 201) {
      notification.success({
        message: "Tạo sản phẩm thành công",
        showProgress: true,
        placement: "top",
        // onClose: () => {
        //   navigate("/login");
        // },
      });
    } else {
      notification.error({
        message: "Something went wrong",
        showProgress: true,
        placement: "top",
      });
    }
  };

  return (
    <div className="w-[90%] relative">
      <ProductForm
        onSubmit={onSubmit}
        // fileList={fileList}
        // images={images}
        // previewImage={previewImage}
        // previewOpen={previewOpen}
        // setPreviewImage={setPreviewImage}
        // setPreviewOpen={setPreviewOpen}
        // handlePreview={handlePreview}
        // handleChange={handleChange}
        // uploadButton={uploadButton}
        // control={control}
        // watch={watch}
        // options={options}
        // handleChangeCategory={handleChangeCategory}
        // selectedCategory={selectedCategory}
        // brands={brands}
        // attributes={attributes}
        // variations={variations}
        // setValue={setValue}
      />
      {/* <FooterView
        actionLabel="Lưu và hiển thị"
        secondaryActionLabel="Lưu và ẩn"
        onSubmit={handleSubmit((data) => {
          setIsDraft(false);
          onSubmit(data);
        })}
        secondaryAction={handleSubmit((data) => {
          setIsDraft(true);
          onSubmit(data);
        })}
        cancelLabel="Hủy"
        onCancel={handleCancel}
      /> */}
    </div>
  );
}

export default ProductCreatePage;
