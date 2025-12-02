import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/ideas/[id]/prototype - Create or update prototype data
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { wireframes, workflow, techOutline, mockups } = body;

    // Check if idea exists
    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Upsert prototype data
    const prototype = await prisma.prototype.upsert({
      where: { ideaId: id },
      update: {
        wireframes,
        workflow,
        techOutline,
        mockups,
      },
      create: {
        ideaId: id,
        wireframes,
        workflow,
        techOutline,
        mockups,
      },
    });

    // Update idea stage to PROTOTYPE
    await prisma.idea.update({
      where: { id },
      data: { stage: 'PROTOTYPE' },
    });

    return NextResponse.json(prototype);
  } catch (error) {
    console.error('Error prototyping idea:', error);
    return NextResponse.json(
      { error: 'Failed to prototype idea' },
      { status: 500 }
    );
  }
}

// GET /api/ideas/[id]/prototype - Get prototype data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const prototype = await prisma.prototype.findUnique({
      where: { ideaId: id },
    });

    if (!prototype) {
      return NextResponse.json(
        { error: 'Prototype not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(prototype);
  } catch (error) {
    console.error('Error fetching prototype:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prototype' },
      { status: 500 }
    );
  }
}
