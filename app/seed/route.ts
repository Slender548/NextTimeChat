import {Client} from "pg";

function seedChats(client: Client) {
    client.query("CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, room VARCHAR(255), name VARCHAR(255), message VARCHAR(255))");
}

export function GET(request: Request) {
    const client = new Client();
    client.connect();
    seedChats(client);
    return new Response("Database seeded!", {
        status: 200,
    });
}