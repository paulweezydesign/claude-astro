import { connectToDb } from '../../lib/mongodb';

export async function POST({ request }) {
  try {
    const db = await connectToDb();
    const snippet = await request.json();
    
    await db.collection('snippets').insertOne({
      ...snippet,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}