import { URLAPI } from "./settings";
import { deleteToApi, getFromApi, postToApi } from "./wrapperPeticions";
const PATH_PRINCIPAL = "salesDetails";

export const getSaleDetailsService = async (id) => {
  try {
    const response = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(`Error in show sale details ${error}`);
    throw error;
  }
};

export const createSaleDetailService = async (body, onSuccess, onPending) => {
  try {
    const { data } = await postToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}`,
      onSuccess,
      onPending,
    );
    return data;
  } catch (error) {
    console.error(`Error in create sale detail ${error}`);
    throw error;
  }
};

export const deleteSaleDetailService = async (id, onSuccess) => {
  try {
    await deleteToApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`, onSuccess);
  } catch (error) {
    console.error(`Error in delete detail ${error}`);
    throw error;
  }
};
