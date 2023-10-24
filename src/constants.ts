export const API_URL = "/api";

export const API_CATEGORIES = `${API_URL}/categories`;
export const API_PRODUCTS = `${API_URL}/products`;
export const API_SEARCH_PRODUCTS = `${API_URL}/products/search`;
export const API_PRODUCTS_BY_CATEGORY = `${API_URL}/products/category`;
export const API_CART = `${API_URL}/cart`;
export const API_ADD_TO_CART = `${API_CART}/add`;
export const API_AUTH = `${API_URL}/login`;
export const API_REGISTER = `/api/register`;
export const API_CHECK_SESSION = `${API_URL}/session`;
export const API_BUY = `${API_CART}/buy`;

export const THIRD_API_DOMAIN = "https://dummyjson.com";

export const THIRD_API_CATEGORIES = `${THIRD_API_DOMAIN}/products/categories`;
export const THIRD_API_PRODUCTS = `${THIRD_API_DOMAIN}/products`;
export const THIRD_API_SEARCH_PRODUCTS = `${THIRD_API_DOMAIN}/products/search`;
export const THIRD_API_PRODUCTS_BY_CATEGORY = `${THIRD_API_DOMAIN}/products/category`;
export const THIRD_API_SINGLE_CART = `${THIRD_API_DOMAIN}/carts`;
export const THIRD_API_SINGLE_CART_USER = `${THIRD_API_SINGLE_CART}/user`;
export const THIRD_API_AUTH = `${THIRD_API_DOMAIN}/auth/login`;
export const SESION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days
export const SESION_DURATION_MINUTES = 60 * 24 * 7; // 7 days

export const COOKIE_NAME = "DUMMY_JSON_SHOP_TOKEN";
