'use server';
// import { redirect } from "next/navigation";
import { isAdmin } from './isAdmin';
import { createClient } from './server';

export async function secure() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (!(await isAdmin(user.id))) {
    throw new Error('Unauthorized');
  }
}
