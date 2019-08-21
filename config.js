export const baseUrl = process.env.API_PORT ? `${process.env.API_HOST}:${process.env.API_PORT}` : `${process.env.API_HOST}`;
export const apiUrl = `${baseUrl}/api`;
