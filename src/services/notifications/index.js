import { axiosInstance } from "../../core/axiosInstance";
import { apiOrigin } from "~/constants";

export async function getNotification(userId, isAll) {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/notification?user_id=${userId}&isAll=${isAll}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function readNotification(notify_id, isRead) {
  try {
    const res = await axiosInstance.patch(
      `${apiOrigin}/notification/${notify_id}`,
      {
        isRead,
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function countNotification(isRead) {
  try {
    const res = await axiosInstance.get(
      `${apiOrigin}/notification/count?isRead=${isRead}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
