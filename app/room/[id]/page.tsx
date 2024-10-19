"use client";
import React, { createRef, useEffect, useState } from "react";
import { getChatMessages } from "@/app/server/db";
import { writeMessage } from "@/app/server/actions";
import { redirect, useSearchParams } from "next/navigation";

interface Message {
  name: string;
  message: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [room] = useState<string>(params.id);
  const message = createRef<HTMLInputElement>();
  const searchParams = useSearchParams();
  useEffect(() => {

    async function fetchMessages() {
      const messages = await getChatMessages(room);
      setMessages(messages);
    }
    fetchMessages();
    const i = setInterval(fetchMessages, 400);
    return () => {
      clearInterval(i);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const nick = searchParams.get("nickname");
    if (nick == null) {
      alert("Пожалуйста введите никнейм. Please enter nickname.");
      redirect("/");
    }
    setNickname(nick);
  }, []);
  return (
    <div className="flex justify-center items-center flex-col">
      {messages.map((message, index) => (
        <p key={index}>
          {message.name}: {message.message}
        </p>
      ))}
      <form
        action={(e: FormData) => {
          writeMessage(e, nickname, room);
          message.current!.value = "";
        }}
      >
        <input className="text-black" type="text" name="message" ref={message} />
      </form>
    </div>
  );
}
