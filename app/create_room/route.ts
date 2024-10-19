import { addMessage } from "@/app/server/db";

export async function GET() {
    await addMessage("test", "test", "test");
    return new Response("Create Room", {
        status: 200,
    });
}