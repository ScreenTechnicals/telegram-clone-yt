import React from "react";
import Image from "next/future/image";
import DefaultImage from "../public/images/default.png";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Card = ({ name, imageURL, email, id, setSearch }) => {
  const [user, loading] = useAuthState(auth);

  const addChat = async () => {
    await setDoc(
      doc(db, "chats", `chats-${user.uid}${id}`),
      {
        users: [user?.email, email],
      },
      { merge: true }
    );
    alert("chat added");
    setSearch("");
  };
  return (
    <div
      className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#353535] space-x-6 cursor-pointer hover:bg-[#1d1d1d]"
      onClick={addChat}
    >
      <div className="rounded-full w-[55px] h-[55px] overflow-hidden">
        <Image
          src={imageURL}
          alt=""
          width={55}
          height={55}
          priority={true}
          quality={100}
        />
      </div>
      <span>{name}</span>
    </div>
  );
};

export default Card;
