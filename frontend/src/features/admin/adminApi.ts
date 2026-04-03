import { baseApi } from '../api/baseApi';
import type { AdminStats, User } from '../../types';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => '/admin/stats',
      providesTags: ['AdminStats'],
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      transformResponse: (res: { users: User[] } | User[]) =>
        Array.isArray(res) ? res : res.users,
      providesTags: ['Users'],
    }),
    uploadImage: builder.mutation<string, FormData>({
      query: (formData) => ({
        url: '/upload/image',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetUsersQuery,
  useUploadImageMutation,
} = adminApi;
