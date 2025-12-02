import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/ideas/[id]/expand - Create or update expansion data
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      breakdown,
      userStories,
      constraints,
      clarityQuestions,
      firstPrinciples,
      aiSuggestions,
    } = body;

    // Check if idea exists
    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Upsert expansion data
    const expansion = await prisma.expansion.upsert({
      where: { ideaId: id },
      update: {
        breakdown,
        userStories: typeof userStories === 'object' ? JSON.stringify(userStories) : userStories,
        constraints,
        clarityQuestions,
        firstPrinciples,
        aiSuggestions,
      },
      create: {
        ideaId: id,
        breakdown,
        userStories: typeof userStories === 'object' ? JSON.stringify(userStories) : userStories,
        constraints,
        clarityQuestions,
        firstPrinciples,
        aiSuggestions,
      },
    });

    // Update idea stage to EXPAND
    await prisma.idea.update({
      where: { id },
      data: { stage: 'EXPAND' },
    });

    return NextResponse.json(expansion);
  } catch (error) {
    console.error('Error expanding idea:', error);
    return NextResponse.json(
      { error: 'Failed to expand idea' },
      { status: 500 }
    );
  }
}

// GET /api/ideas/[id]/expand - Get expansion data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const expansion = await prisma.expansion.findUnique({
      where: { ideaId: id },
    });

    if (!expansion) {
      return NextResponse.json(
        { error: 'Expansion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(expansion);
  } catch (error) {
    console.error('Error fetching expansion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expansion' },
      { status: 500 }
    );
  }
}
