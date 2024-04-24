import { auth, db } from "@/firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Cloud, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Chat = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const { uid, photoURL, displayName, email } = auth.currentUser;

  async function sendMessage(e) {
    console.log(msg);
    e.preventDefault();

    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      displayName,
    });

    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  function changeAccount() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <div className="flex h-screen w-full">
        {/* left side */}
        <div className="hidden w-64 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900 md:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
                <h2 className="text-lg font-semibold">Chats</h2>
              </div>
            </div>

            {/* DropdownMenu at the bottom */}
            <div className="mb-6">
              <Separator />
              <Separator />

              <DropdownMenu>
                {/* Trigger */}
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Avatar className="mr-2">
                      <AvatarImage src={photoURL} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-col">
                      <div className="text-base justify-start flex">
                        {displayName}
                      </div>
                      <div className="text-xs">{email}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Change account */}
                  <DropdownMenuItem onClick={changeAccount}>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>Change Account</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  {/* Log out */}
                  <DropdownMenuItem onClick={() => auth.signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-1 flex-col">
          {/* Top portion */}
          <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
            <div className="flex items-center gap-2">
              {/* <Button size="icon" variant="ghost">
              <SearchIcon className="h-5 w-5" />
            </Button> */}
            </div>
          </div>

          {/* chat history */}
          <div className="flex-1 overflow-auto p-4">
            <div className="msgs">
              {messages.map(({ id, text, photoURL, uid, displayName }) => (
                <div>
                  <div
                    className={`flex items-end gap-3 ${
                      uid === auth.currentUser.uid
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="max-w-[75%] mt-3">
                      <div
                        className={`rounded-t-lg rounded-bl-lg ${
                          uid === auth.currentUser.uid
                            ? "bg-primary"
                            : "bg-amber-800"
                        } p-3 text-sm text-white`}
                      >
                        {text}
                      </div>
                      <div
                        className={`flex ${
                          uid === auth.currentUser.uid
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {displayName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message sending */}
          <div className="flex items-center">
            <Input
              className="flex-1"
              placeholder="Type your message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button onClick={sendMessage} variant="primary">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
