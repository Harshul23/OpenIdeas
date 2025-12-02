import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/ideas/[id]/validate - Create or update validation data
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      feasibilityScore,
      marketFit,
      competitorAnalysis,
      risks,
      assumptions,
      validated,
    } = body;

    // Check if idea exists
    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Upsert validation data
    const validation = await prisma.validation.upsert({
      where: { ideaId: id },
      update: {
        feasibilityScore,
        marketFit,
        competitorAnalysis,
        risks,
        assumptions,
        validated: validated ?? false,
      },
      create: {
        ideaId: id,
        feasibilityScore,
        marketFit,
        competitorAnalysis,
        risks,
        assumptions,
        validated: validated ?? false,
      },
    });

    // Update idea stage to VALIDATE
    await prisma.idea.update({
      where: { id },
      data: { stage: 'VALIDATE' },
    });

    return NextResponse.json(validation);
  } catch (error) {
    console.error('Error validating idea:', error);
    return NextResponse.json(
      { error: 'Failed to validate idea' },
      { status: 500 }
    );
  }
}

// GET /api/ideas/[id]/validate - Get validation data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const validation = await prisma.validation.findUnique({
      where: { ideaId: id },
    });

    if (!validation) {
      return NextResponse.json(
        { error: 'Validation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(validation);
  } catch (error) {
    console.error('Error fetching validation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch validation' },
      { status: 500 }
    );
  }
}
