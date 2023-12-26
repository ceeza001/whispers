export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  username: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewMessage = {
  room: string;
  content: string;
  sender: string;
};

export type IUpdatePost = {
  postId: string;
  title: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  type: string,
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
};

export type INewUser = {
  email: string;
  username: string;
  password: string;
};

export type INewGroup = {
  userId: string;
  name: string;
  bio: string;
};
