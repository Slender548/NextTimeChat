"use server";

import { redirect } from "next/navigation";
import { addMessage } from "@/app/server/db";

export async function addRoom(formData: FormData) {
    const name = formData.get("name");
    const creator = formData.get("creator");
    const id = crypto.randomUUID();
    console.log(name, "," ,creator);
    if (typeof name !== "string" || typeof creator !== "string") {
        return;
    }
    
    redirect(`/room/${id}`);

}

export async function writeMessage(formData: FormData, name: string, room: string) {
    const message = formData.get("message");
    
    if (room === "" || name === "" || message === null || typeof message !== "string") {
        return;
    }

    addMessage(room, name, message);
    
}