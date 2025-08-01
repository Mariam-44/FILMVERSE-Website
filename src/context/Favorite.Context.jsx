import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const WishlistContext = createContext();

export function FavoriteProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      if (user) {
        getWishlist(user.uid);
      } else {
        setWishlist([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getWishlist = async (uid = userId) => {
    if (!uid) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "wishlist"), where("userId", "==", uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("Fetched wishlist data:", data);
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (item) => {
    if (!userId || !item.itemId) {
      console.error("Missing userId or itemId");
      return;
    }

    const exists = wishlist.some((el) => el.id === item.itemId); 
    if (exists) return;

    try {
      await addDoc(collection(db, "wishlist"), {
        id: item.itemId, 
        title: item.title,
        poster_path: item.poster_path,
        type: item.type,
        userId,
      });
      getWishlist();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const removeFromWishlistByItemId = async (itemId) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    
    if (!itemId) {
      console.error("Item ID is undefined or null");
      return;
    }

    try {
      console.log("Removing item with ID:", itemId, "for user:", userId);
      
      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", userId),
        where("id", "==", itemId) 
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log("No matching documents found");
        return;
      }
      
      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "wishlist", docItem.id))
      );
      
      await Promise.all(deletePromises);

      setWishlist((prev) => prev.filter((item) => item.id !== itemId)); 
      
      console.log("removed");
    } catch (error) {
      console.error("Error :", error.message);
    }
  };

  const isInWishlist = (itemId) => {
    if (!itemId) return false;
    return wishlist.some((item) => item.id === itemId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlistByItemId,
        getWishlist,
        isInWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);