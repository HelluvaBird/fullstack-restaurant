import { prisma } from '@/lib/prisma';
import { hash, genSalt } from 'bcryptjs';
import { NextResponse } from 'next/server';

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user as ArrayLike<unknown>).filter(
      ([key]) => !keys.includes(key as Key)
    )
  ) as Omit<User, Key>;
}

const handler = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      },
    });

    const userWithoutPassword = exclude(newUser, ['password']);

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json('Something went wrong regostering new user', {
      status: 500,
    });
  }
};

export { handler as POST };
