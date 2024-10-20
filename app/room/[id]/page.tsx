"use client";
import React, { useRef, useEffect, useState } from "react";
import { getChatMessages } from "@/app/server/db";
import { writeMessage } from "@/app/server/actions";
import { redirect } from "next/navigation";

interface Message {
  name: string;
  message: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [room] = useState<string>(params.id);
  const message = useRef<HTMLInputElement>(null);
  const scrollable = useRef<HTMLDivElement>(null);
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
    const { searchParams } = new URL(window.location.href);
    const nick = searchParams.get("nickname");
    if (nick == null) {
      alert("Пожалуйста введите никнейм. Please enter nickname.");
      redirect("/");
    }
    setNickname(nick);
  }, []);
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="flex flex-col h-5/6 w-11/12 border overflow-y-scroll" ref={scrollable}>
        {messages.map((message, index) => (
          <div key={index} className="h-full p-2 border-b border-gray-700">
            <p className="font-bold text-blue-500">{message.name}</p>
            <p className="text-gray-300">{message.message}</p>
          </div>
        ))}
      </div>
      <form
        action={(e: FormData) => {
          writeMessage(e, nickname, room);
          message.current!.value = "";
          setTimeout(() => {
             scrollable.current!.scrollTo(0, scrollable.current!.scrollHeight);
          }, 600);
        }}
        className="w-screen flex justify-center items-center"
      >
        <input
          className="w-11/12 bg-black rounded-md p-2 text-center text-lg"
          type="text"
          name="message"
          ref={message}
        />
      </form>
    </div>
  );
}
