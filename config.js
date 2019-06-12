export const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : `${process.env.API_HOST}:${process.env.API_PORT}`;
export const apiUrl = `${baseUrl}/api`;
