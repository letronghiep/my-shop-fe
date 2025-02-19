import { axiosInstance } from "~/core/axiosInstance";
import { apiOrigin } from "~/constants";
export async function getProductByShop(query) {
  try {
    const res = await axiosInstance.get(`${apiOrigin}/product/seller?${query}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function createProduct(body) {
  try {
    const res = await axiosInstance.post(`${apiOrigin}/product/seller`, body);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getProductData(productId) {
  try {
    const res = await axiosInstance.get(`${apiOrigin}/product/${productId}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function searchProductService(
  q,
  product_status,
  product_category,
  page,
  limit,
  sortBy
) {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/product/search?q=${q}&product_status=${product_status}&product_category=${product_category}&page=${page}&offset=${limit}&sort_by=${sortBy}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getInfoProduct(product_slug) {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/product/info/${product_slug}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
