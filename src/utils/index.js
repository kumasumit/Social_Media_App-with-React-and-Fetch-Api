export * from "./constants";

//Local Storage Functions
//set Item
export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Cannot store in local storage");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

//get item
export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get value from local storage");
  }

  return localStorage.getItem(key);
};

//remove Item
export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(
      "Cannot remove item from local storage, key does not exist"
    );
  }

  localStorage.removeItem(key);
};

//to convert body payload from form data
export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123213'
};
