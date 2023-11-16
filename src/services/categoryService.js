import { URLAPI } from "./settings";
import { getFromApi } from "./wrapperPeticions";
const PATH_PRINCIPAL = "category";

export const getCategoryService = async () => {
  try {
    const { data } = await getFromApi(`${URLAPI}/${PATH_PRINCIPAL}/`);
    return data.data;
  } catch (error) {
    console.error(`Error in category ${error}`);
    throw error;
  }
};
