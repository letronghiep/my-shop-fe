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
