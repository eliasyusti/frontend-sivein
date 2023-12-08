import { URLAPI } from "./settings";
import {
  deleteToApi,
  getFromApi,
  postToApi,
  putToApi,
} from "./wrapperPeticions";
const PATH_PRINCIPAL = "customers";

export const getCustomersService = async () => {
  try {
    const { data } = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/`);
    return data.data;
  } catch (error) {
    console.error(`Error in customers ${error}`);
    throw error;
  }
};

export const createCustomerService = async (body, onSuccess, onPending) => {
  try {
    const { data } = await postToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}`,
      onSuccess,
      onPending,
    );
    return data;
  } catch (error) {
    console.error(`Error in create customers ${error}`);
    throw error;
  }
};

export const editCustomersService = async (body, onSuccess) => {
  try {
    const response = await putToApi(
      body,
      `${URLAPI}/${PATH_PRINCIPAL}/${body.id}`,
      onSuccess,
    );
    return response;
  } catch (error) {
    console.error(`Error in update customer ${error}`);
    throw error;
  }
};

export const deleteCustomerService = async (id, onSuccess) => {
  try {
    await deleteToApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`, onSuccess);
  } catch (error) {
    console.error(`Error in delete customer ${error}`);
    throw error;
  }
};
