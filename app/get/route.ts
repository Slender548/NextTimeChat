import { getChatMessages } from "@/app/server/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const messages = await getChatMessages(id);
    return new Response(JSON.stringify(messages), {status: 200});
}