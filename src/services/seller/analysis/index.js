import { axiosInstance } from "~/core/axiosInstance";
import { apiOrigin } from "~/constants";
export async function analysisSeller() {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/analysis/seller`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
