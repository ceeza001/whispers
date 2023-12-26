import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { INewGroup, INewUser, IUpdateUser } from "@/types";

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if (!newAccount) {
      throw new Error("Failed to create account");
    }

    const avatarUrl = avatars.getInitials(user.username);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: newAccount.name, // or user.username, depending on your requirement
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  imageUrl: string; // Assuming imageUrl is a string
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    const newUserRoom = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.roomCollectionId,
      ID.unique(),
      {
        owner: newUser.$id,
        name:  newUser.username, // Use user.username if provided, otherwise newUser.name
      }
    );

    return { user: newUser, room: newUserRoom }; // Return both user and room information
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
}


// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
    
    return error;
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// MESSAGES
// ============================================================

// ============================== WRITE MESSAGE

export async function writeMessage(room: string, content: string) {
  try {
    const newMessage = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        room,
        content,
      }
    );

    if (!newMessage || !newMessage.$id) {
      throw new Error('Failed to create a new message.');
    }

    console.log(newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error writing message:', error);
  }
}

// ============================== UPDATE STATUS
export async function updateStatus(message: string) {
  try {
    //  Update status
    const updatedStatus = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      message,
      {
        status: "read"
      }
    );

    // Failed to update
    if (!updatedStatus) {
      throw Error;
    }

    
    return updatedStatus;
  } catch (error) {
    console.log(error);
  }
}

export async function writeRoomMessage(room: string, content: string, sender: string) {
  try {
    const newMessage = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        groupRoom: room,
        content,
        sender,
      }
    );

    if (!newMessage || !newMessage.$id) {
      throw new Error('Failed to create a new message.');
    }

    console.log(newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error writing message:', error);
    // Ensure that the error is propagated, so it can be handled by the calling code.
    throw error;
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        username: user.username,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// ROOM
// ============================================================

// ============================== CREATE ROOM
export async function createGroup(group: INewGroup) {
  try {
    const avatarUrl = avatars.getInitials(group.name);
    
    const newGroup = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      ID.unique(),
      {
        owner: group.userId,
        name: group.name,
        bio: group.bio,
        imageUrl: avatarUrl,
        members: [group.userId], // Initialize members as an array with the initial user
      }
    );

    if (!newGroup) {
      await deleteFile(uploadedFile.$id);
      throw Error("Failed to create group");
    }

    return newGroup;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
}

// ============================== JOIN ROOM
export async function joinRoom(roomId: string, membersArray: string[]) {
  try {
    const addUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      roomId,
      {
        members: membersArray, // Initialize members as an array with the initial user
      }
    );

    return addUser;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
}

// ============================== GET USER'S GROUP
export async function getUserGroups(userId: string) {
  // Create an array to store queries for fetching groups
  const queries: any[] = [
    Query.orderDesc("$createdAt"),
  ];

  try {
    // Use the Appwrite SDK to list documents from the group collection
    const groups = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId, // Assuming this should be the group collectionId
      queries
    );

    // If the groups are not retrieved, throw an error
    if (!groups) throw Error;

    // Return the retrieved groups
    return groups;
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
  }
}

// ============================== GET ROOM BY ID
export async function getRoomById(roomId: string) {
  try {
    const room = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      roomId
    );

    if (!room) throw Error;

    return room;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ROOM'S MESSAGES
export async function getRoomMessages(roomId?: string) {
  if (!roomId) return;

  try {
    const message = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId
      [Query.equal("groupRoom", roomId), Query.orderDesc("$createdAt")]
    );

    if (!message) throw Error;

    return message;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE POST
export async function deleteRoom(roomId?: string) {
  if (!roomId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupCollectionId,
      roomId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}
