import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const { book_id, date } = body;

  // get user id
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  if (userError) {
    console.error(userError);
    return Response.json({
      error: 'Failed to request book',
    });
  }

  const { error } = await supabase.from('borrowed_books').insert({
    book_id: book_id,
    approved: false,
    borrow_on: new Date(date),
    borrower_id: userData.id,
  });

  if (error) {
    console.error(error);
    return Response.json({
      error: 'Failed to request book',
    });
  }

  return Response.json({
    success: true,
  });
}
