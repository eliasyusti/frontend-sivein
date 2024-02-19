import { URLAPI } from "./settings";
import {
  deleteToApi,
  getFromApi,
  postToApi,
  putToApi,
} from "./wrapperPeticions";
const PATH_PRINCIPAL = "sales";
export const getSalesService = async () => {
  try {
    const { data } = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/`);
    return data.data;
  } catch (error) {
    console.error(`Error in sale ${error}`);
    throw error;
  }
};

export const getSaleByIdService = async (id) => {
  try {
    const response = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(`Error in show sale details ${error}`);
    throw error;
  }
};

export const createSaleService = async (body, onSuccess, onPending) => {
  try {
    const { data } = await postToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}`,
      onSuccess,
      onPending,
    );
    return data;
  } catch (error) {
    console.error(`Error in create sale ${error}`);
    throw error;
  }
};

export const editSaleService = async (body, onSuccess) => {
  try {
    const response = await putToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}/${body.id}`,
      onSuccess,
    );
    return response;
  } catch (error) {
    console.error(`Error in update sale ${error}`);
    throw error;
  }
};

export const deleteSaleService = async (id, onSuccess) => {
  try {
    await deleteToApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`, onSuccess);
  } catch (error) {
    console.error(`Error in delete sale ${error}`);
    throw error;
  }
};
