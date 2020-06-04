/**
 * Convert JS object to GET request params.
 * Example
 *  Input object: {id: "1", name: "username"}
 *  Output: "id=1&name=username"
 * @param obj JS object.
 *
 * @return GET request params.
 */
function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}

/**
 * Create GET request query string with url and params.
 * Example
 *  Input: url="https://api.com"; obj={id: "1", name: "username"};
 *  Output: "https://api.com?id=1&name=username"
 *
 * @param url Request url.
 * @param obj GET Request params as JS object.
 *
 * @return GET request query string.
 */
export const getUrlWithParams = (url, obj) => {
  return `${url}?${objectToQueryString(obj)}`;
};
