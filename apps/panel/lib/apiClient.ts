import { API_BASE_URL, BUSINESS_API_URL } from "@constants";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const businessApiClient = axios.create({
    baseURL: BUSINESS_API_URL,
    withCredentials: true,
})
