"use server";
import { Client } from "pg";

const client = new Client();
client.connect();

export async function addMessage(room: string, name: string, message: string) {
    await client.query("INSERT INTO messages (room, name, message) VALUES ($1, $2, $3)", [room, name, message]);
}

export async function getChatMessages(room: string | null) {
    const result = await client.query("SELECT name, message FROM messages WHERE room = $1", [room]);
    return result.rows;
}

export async function getRooms() {
    const result = await client.query("SELECT DISTINCT ON (room) room, id FROM messages ORDER BY room, id DESC");
    return result.rows;
}