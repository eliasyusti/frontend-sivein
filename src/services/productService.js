import { URLAPI } from "./settings";
import { getFromApi, postToApi } from "./wrapperPeticions";
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
