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

export const WatchLaterContext = createContext();

export function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      if (user) {
        getWatchLater(user.uid);
      } else {
        setWatchLater([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getWatchLater = async (uid = userId) => {
    if (!uid) {
      setWatchLater([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "watchlater"), where("userId", "==", uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWatchLater(data);
    } catch (error) {
      console.error("Error fetching watch later:", error);
      setWatchLater([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchLater = async (item) => {
    if (!userId || !item.itemId) {
      console.error("Missing userId or itemId");
      return;
    }

    const exists = watchLater.some((el) => el.id === item.itemId); 
    if (exists) return;

    try {
      await addDoc(collection(db, "watchlater"), {
        id: item.itemId,
        title: item.title,
        poster_path: item.poster_path,
        type: item.type,
        userId,
      });
      getWatchLater();
    } catch (error) {
      console.error("Error adding to watch later:", error);
    }
  };

  const removeFromWatchLater = async (itemId) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    
    if (!itemId) {
      console.error("Item ID is undefined or null");
      return;
    }

    try {
      const q = query(
        collection(db, "watchlater"),
        where("userId", "==", userId),
        where("id", "==", itemId) 
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log("No matching documents found");
        return;
      }
      
      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "watchlater", docItem.id))
      );
      
      await Promise.all(deletePromises);

      setWatchLater((prev) => prev.filter((item) => item.id !== itemId)); 
    } catch (error) {
      console.error("Error removing from watch later:", error.message);
    }
  };

  const isInWatchLater = (itemId) => {
    if (!itemId) return false;
    return watchLater.some((item) => item.id === itemId);
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        addToWatchLater,
        removeFromWatchLater,
        getWatchLater,
        isInWatchLater,
        loading,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export const useWatchLater = () => useContext(WatchLaterContext);
