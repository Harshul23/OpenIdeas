import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/ideas/[id]/iterate - Create a new iteration
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { changes, feedback, improvements } = body;

    if (!changes) {
      return NextResponse.json(
        { error: 'Changes are required' },
        { status: 400 }
      );
    }

    // Check if idea exists
    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Get the latest iteration version
    const latestIteration = await prisma.iteration.findFirst({
      where: { ideaId: id },
      orderBy: { version: 'desc' },
    });

    const newVersion = (latestIteration?.version ?? 0) + 1;

    // Create new iteration
    const iteration = await prisma.iteration.create({
      data: {
        ideaId: id,
        version: newVersion,
        changes,
        feedback,
        improvements,
      },
    });

    // Update idea stage to ITERATE
    await prisma.idea.update({
      where: { id },
      data: { stage: 'ITERATE' },
    });

    return NextResponse.json(iteration, { status: 201 });
  } catch (error) {
    console.error('Error creating iteration:', error);
    return NextResponse.json(
      { error: 'Failed to create iteration' },
      { status: 500 }
    );
  }
}

// GET /api/ideas/[id]/iterate - Get all iterations
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const iterations = await prisma.iteration.findMany({
      where: { ideaId: id },
      orderBy: { version: 'desc' },
    });

    return NextResponse.json(iterations);
  } catch (error) {
    console.error('Error fetching iterations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch iterations' },
      { status: 500 }
    );
  }
}
