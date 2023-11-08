import axios from "axios";
import base64 from "base-64";

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

export const postToApi = async (
  json = {},
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = "",
  type = "json",
) => {
  if (
    url == null ||
    url === "" ||
    onSuccess == null ||
    typeof onSuccess !== "function"
  ) {
    throw new Error("url and onSuccess can't be null or empty");
  }
  let headers;
  // eslint-disable-next-line no-unused-vars
  let jsonString = "";
  await onPending();
  if (type.includes("application") || type.includes("image")) {
    headers = {
      "Content-Type": `${type}`,
      "Content-Disposition": `attachment; filename=${json.name}`,
    };
  } else {
    switch (type) {
      case "auth":
        headers = {
          Authorization: `Basic ${base64.encode(token)}`,
        };
        JSON.stringify(json);
        break;
      default:
        headers = {
          Authorization: `Bearer ${token}`,
        };
        JSON.stringify(json);
    }
  }

  return axios
    .post(url, json, { headers })
    .then((response) => {
      const { status, data } = response;
      if (response.status === 200) {
        return onSuccess({ data, status });
      } else {
        return onError({ data, status });
      }
    })
    .catch((error) => {
      return onError(error.response.data);
    });
};
