import axios from "axios";
export const getFromApi = async (url, onError = () => {}) => {
  return axios
    .get(url)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        return { data, status };
      } else {
        return onError({ response, status });
      }
    })
    .catch((error) => onError(error));
};
