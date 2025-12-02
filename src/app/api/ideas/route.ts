import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Type definitions for idea stages and statuses
type IdeaStage = 'CAPTURE' | 'EXPAND' | 'VALIDATE' | 'PROTOTYPE' | 'BUILD' | 'ITERATE';
type IdeaStatus = 'ACTIVE' | 'ARCHIVED' | 'COMPLETED' | 'ON_HOLD';

// GET /api/ideas - List all ideas
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage') as IdeaStage | null;
    const status = searchParams.get('status') as IdeaStatus | null;
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    if (stage) where.stage = stage;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const ideas = await prisma.idea.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        tags: true,
        _count: {
          select: { comments: true, iterations: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

// POST /api/ideas - Create a new idea
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, userId, tags } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: 'Title, description, and userId are required' },
        { status: 400 }
      );
    }

    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        userId,
        stage: 'CAPTURE',
        status: 'ACTIVE',
        tags: tags
          ? {
              connectOrCreate: tags.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        tags: true,
      },
    });

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}
