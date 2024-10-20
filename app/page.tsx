"use server";
import React from "react";
import { getRooms } from "@/app/server/db";
import { RoomContainer } from "@/app/lib/roomContainer";



export default async function Page() {
  const rooms = await getRooms();
  
  return (
    <RoomContainer rooms={rooms} />
  );
}
