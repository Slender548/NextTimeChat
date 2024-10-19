"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRooms } from "@/app/server/db";

type PreviewRoom = {
  room: string;
  id: string;
};

export default function Page(): JSX.Element {
  const [rooms, setRooms] = useState<PreviewRoom[]>([]);
  const [nickname, setNickname] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    async function fetchRooms() {
      const rooms = await getRooms();
      setRooms(rooms);
    }
    fetchRooms();
  }, [])

  const gotoRoom = (id: string): void => {
    if (nickname === "") {
      alert("Пожалуйста введите никнейм. Please enter nickname.");
      return;
    }
    router.push(`/room/${id}?nickname=${nickname}`);
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full my-2">
        <input
          className="w-11/12 rounded text-center text-lg text-slate-950 bg-gray-500 border-blue-500 border"
          placeholder="Nickname.."
          maxLength={15}
          onChange={handleNickname}
        />
      </div>
      <div className="flex justify-center items-center w-full flex-col">
        {rooms.map((room: PreviewRoom) => (
          <div
            key={room.id}
            className="w-11/12 border m-2 h-20 rounded-lg bg-slate-950 relative"
          >
            <div className="flex w-full p-2 h-full">
              <div className="w-8/12 h-full flex flex-col justify-center p-1 items-center">
                <p>{room.room}</p>
              </div>
              <button
                onClick={() => gotoRoom(room.room)}
                className="w-4/12 border h-full transition rounded-md bg-blue-500 hover:bg-blue-700 active:bg-blue-950 p-1 justify-center items-center"
              >
                Войти
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
