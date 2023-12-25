export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // COMMUNITY KEYS
  GET_COMMUNITY_BY_ID = "getCommunityById",
  GET_INFINITE_COMMUNITIES = "getInfiniteCommunities",
  GET_USER_COMMUNITIES = "getUserCommunities",
 
  // POST KEYS
  GET_POSTS = "getPosts",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_RECENT_POSTS = "getRecentPosts",
  GET_POST_BY_ID = "getPostById",
  GET_USER_GROUPS = "getUserGroups",
  GET_ROOM_BY_ID = "getRoomById",
  GET_ROOM_MESSAGES = "getRoomMessages",
  GET_FILE_PREVIEW = "getFilePreview",

  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",
  SEARCH_COMMUNITIES = "getSearchCommunities",
}