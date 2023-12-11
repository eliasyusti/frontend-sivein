import { URLAPI } from "./settings";
import { getFromApi, postToApi } from "./wrapperPeticions";
const PATH_PRINCIPAL = "salesDetails";

export const getSaleDetailsService = async (id) => {
  try {
    const { data } = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/${id}`);
    return data.data;
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
