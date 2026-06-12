// adminProductApi.js

import axiosInstance from "./axiosInstance";

export const getAdminProducts = (params) => {
    return axiosInstance.get("/api/admin/products", {
        params,
    });
};

export const getAdminProduct = (id) => {
    return axiosInstance.get(`/api/admin/products/${id}`);
};

export const createAdminProduct = (data) => {
    return axiosInstance.post("/api/admin/products", data);
};

export const updateAdminProduct = (id, data) => {
    return axiosInstance.put(`/api/admin/products/${id}`, data);
};

export const deleteAdminProduct = (id) => {
    return axiosInstance.delete(`/api/admin/products/${id}`);
};