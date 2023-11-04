//import { URLAPI } from "./settings";
import { getFromApi } from "./wrapperPeticions";
//import axios from "axios";
//const PATH_PRINCIPAL = "products";

export const getProductsService = async () => {
  try {
    const { data } = await getFromApi("http://localhost:8000/api/products/");
    return data;
  } catch (error) {
    console.error(`Error in products ${error}`);
    throw error;
  }
};
