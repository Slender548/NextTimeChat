"use client";
import React from "react";
import { addRoom } from "@/app/server/actions";

export default function Create() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <form className="h-2/6 w-9/12 flex flex-col" action={(e) => addRoom(e)}>
        <p className="flex justify-center items-center h-1/6 w-full text-xl">Создание комнаты</p>
        <div className="h-4/6 w-full flex justify-center items-center flex-col">
            <div>
                <p className="text-center text-xl">Ник</p>
                <input name="creator" className="rounded-md text-center text-black" minLength={1} maxLength={15} type="text" />
            </div>
            <div>
                <p className="text-center text-xl">Название комнаты</p>
                <input name="name" className="rounded-md text-center text-black" minLength={1} maxLength={15} type="text" />
            </div>
        </div>
        <button className="h-1/6 w-full border rounded-md" type="submit">Создать комнату</button>
      </form>
    </main>
  );
};