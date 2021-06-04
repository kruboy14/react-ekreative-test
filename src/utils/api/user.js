import { axios } from '../../core/axios';

export const userApi = {
  fetchAuthUser: () => axios.get('/user', { withCredentials: true }),
  logoutUser: () => axios.get('/logout', { withCredentials: true }),
};
