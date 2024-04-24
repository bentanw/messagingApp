import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Chat = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  async function sendMessage(e) {
    console.log(msg);
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold">Chats</h2>
            </div>
            <Button
              onClick={changeAccount}
              size="medium"
              variant="contained"
              color="primary"
            >
              Change Account
            </Button>
            <Button
              onClick={() => auth.signOut()}
              size="medium"
              variant="contained"
              color="info"
            >
              Sign Out
            </Button>

            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                  disabled
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showPanel}
                  onCheckedChange={setShowPanel}
                >
                  Panel
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              {messages.map(({ id, text, photoURL, uid }) => (
                <div>
                  <div
                    key={id}
                    className={`msg ${
                      uid === auth.currentUser.uid ? "sent" : "received"
                    }`}
                  >
                    <img src={photoURL}></img>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message sending */}
          <div className="border-t py-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="sendMsg">
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
      </div>
    </div>
  );
}

export default Chat;
