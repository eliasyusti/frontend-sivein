import { URLAPI } from "./settings";
import {
  deleteToApi,
  getFromApi,
  postToApi,
  putToApi,
} from "./wrapperPeticions";
const PATH_PRINCIPAL = "products";

export const getProductsService = async () => {
  try {
    const { data } = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/`);
    return data.data;
  } catch (error) {
    console.error(`Error in products ${error}`);
    throw error;
  }
};

export const createProductsService = async (body, onSuccess, onPending) => {
  try {
    const { data } = await postToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}`,
      onSuccess,
      onPending,
    );
    return data;
  } catch (error) {
    console.error(`Error in create products ${error}`);
    throw error;
  }
};

export const editProductsService = async (body, onSuccess) => {
  try {
    const response = await putToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}/${body.id}`,
      onSuccess,
    );
    return response;
  } catch (error) {
    console.error(`Error in update product ${error}`);
    throw error;
  }
};

export const deleteProductService = async (id, onSuccess) => {
  try {
    await deleteToApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`, onSuccess);
  } catch (error) {
    console.error(`Error in delete product ${error}`);
    throw error;
  }
};

export const editProductActiveService = async (id, active, onSuccess) => {
  try {
    const response = await putToApi(
      { active },
      `${URLAPI}/${PATH_PRINCIPAL}/${id}`,
      onSuccess,
    );
    return response;
  } catch (error) {
    console.error(`Error in edit product active status: ${error}`);
    throw error;
  }
};
