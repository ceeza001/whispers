import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createUserAccount,
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getUsers,
  writeMessage,
  writeRoomMessage,
  getUserGroups,
  getRoomById,
  getRoomMessages,
  deleteRoom,
  updateStatus,
  joinRoom,
  getUserById,
  updateUser,
  createGroup,
} from "@/lib/appwrite/api";
import { INewMessage, INewUser, IUpdatePost, IUpdateUser, INewGroup } from "@/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// GROUP QUERIES
// ============================================================

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (group: INewGroup) => createGroup(group),
  });
};

export const useJoinRoom = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      membersArray,
    }: {
      roomId: string;
      membersArray: string[];
    }) => {
      return joinRoom(roomId, membersArray);
    }
  });
};

export const useGetUserGroups = (userId?: string, limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_GROUPS, userId],
    queryFn: () => getUserGroups(userId, limit),
    enabled: !!userId,
  });
};

export const useGetRoomById = (roomId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ROOM_BY_ID, roomId],
    queryFn: () => getRoomById(roomId),
    enabled: !!roomId,
  });
};

export const useGetRoomMessages = (roomId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ROOM_MESSAGES, roomId],
    queryFn: () => getRoomMessages(roomId),
    enabled: !!roomId,
  });
};

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: ({ roomId }: { roomId?: string }) =>
      deleteRoom(roomId)
  });
};

// ============================================================
// MESSAGE QUERIES
// ============================================================

export const useWriteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ room, content }: { room: string; content: string }) =>
      writeMessage(room, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ message, status }: { message: string; status: string }) =>
      updateStatus(message, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useWriteRoomMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ room, content, sender }: { room: string; content: string; sender: string }) =>
      writeRoomMessage(room, content, sender),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};