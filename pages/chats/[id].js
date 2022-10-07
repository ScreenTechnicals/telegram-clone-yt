import React, { useState } from "react";
import Image from "next/future/image";
import DefaultImage from "../../public/images/default.png";
import Message from "../../components/Message";
import { MdSend } from "react-icons/md";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "chats", id);
  const docSnap = await getDoc(docRef);
  const chatData = JSON.stringify(docSnap?.data());

  return {
    props: {
      id,
      chatData,
    }, // will be passed to the page component as props
  };
}

const Id = ({ id, chatData }) => {
  const [message, setMessage] = useState("");
  const [user, loading] = useAuthState(auth);

  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  const [messageSnapshots, loading2] = useCollection(q);

  const createMessage = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      user: user?.email,
      chatId: id,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };
  const data = JSON.parse(chatData);
  const reciverEmail = data?.users?.filter((item) => item !== user?.email)?.[0];
  // console.log(reciverEmail);
  const usersRef = collection(db, "users");
  const q2 = query(usersRef, where("email", "==", reciverEmail));
  const [userSnapShot, loading3] = useCollection(q2);
  const name = userSnapShot?.docs?.[0]?.data()?.name;
  const imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
  const online = userSnapShot?.docs?.[0]?.data()?.online;
  const lastSeen = userSnapShot?.docs?.[0]?.data()?.lastSeen;
  const newDate = new Date(lastSeen?.seconds * 1000);
  const time = newDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const date = newDate.toLocaleDateString();

  return (
    <div className="gradient w-full h-screen overflow-hidden">
      <div className="w-full p-5 bg-[#00000044] backdrop-blur-sm flex items-center space-x-5">
        <div>
          <Image
            src={imageURL || DefaultImage}
            width={70}
            height={70}
            priority={true}
            quality={100}
            alt=""
            className="rounded-full"
          />
        </div>
        <div>
          <div>{name}</div>
          <div>
            last seen at {time || ""} on {date || ""}
          </div>
        </div>
      </div>
      <div className="w-full h-[77vh] overflow-y-auto overflow-x-hidden p-5">
        {messageSnapshots?.docs?.map((msg) => {
          if (msg.data().chatId === id) {
            return (
              <div key={msg.id}
                className={
                  msg.data().user === user?.email
                    ? "w-full flex justify-end mb-5"
                    : "w-full flex mb-5"
                }
              >
                <Message msg={msg} />
              </div>
            );
          }
        })}
      </div>
      <form
        onSubmit={createMessage}
        className="w-full p-5 bg-[#00000044] backdrop-blur-sm h-full"
      >
        <div className="flex items-center relative">
          <input
            type="text"
            className="w-full border pr-10 pl-5 py-4 bg-transparent rounded-full outline-none focus:border-[#cd71ff]"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            placeholder="Type Here"
            required
          />
          <button className="text-3xl absolute right-4">
            <MdSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Id;
