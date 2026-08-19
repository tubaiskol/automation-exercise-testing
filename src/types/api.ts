/**
 * Wire contracts for the Automation Exercise API.
 *
 * The API answers every request with HTTP 200 and reports the real outcome in
 * the `responseCode` field of the body, so tests assert both layers separately.
 * Field names use the snake_case spelling required by the endpoints.
 */

export interface ApiMessageResponse {
  responseCode: number;
  message: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
}

export interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

export interface Brand {
  id: number;
  brand: string;
}

export interface BrandsResponse {
  responseCode: number;
  brands: Brand[];
}

export interface AccountPayload {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export interface UserDetails {
  id: number;
  name: string;
  email: string;
  title: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface UserDetailsResponse {
  responseCode: number;
  user: UserDetails;
}
