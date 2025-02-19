import { apiOrigin } from "../../constants";
import { axiosInstance } from "../../core/axiosInstance";

export async function getAllCommentForProduct(productId) {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/comment?productId=${productId}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
