import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/ideas/[id]/build - Create or update build data
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { repoUrl, deploymentUrl, techStack, milestones, progress } = body;

    // Check if idea exists
    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Upsert build data
    const build = await prisma.build.upsert({
      where: { ideaId: id },
      update: {
        repoUrl,
        deploymentUrl,
        techStack,
        milestones: typeof milestones === 'object' ? JSON.stringify(milestones) : milestones,
        progress: progress ?? 0,
      },
      create: {
        ideaId: id,
        repoUrl,
        deploymentUrl,
        techStack,
        milestones: typeof milestones === 'object' ? JSON.stringify(milestones) : milestones,
        progress: progress ?? 0,
      },
    });

    // Update idea stage to BUILD
    await prisma.idea.update({
      where: { id },
      data: { stage: 'BUILD' },
    });

    return NextResponse.json(build);
  } catch (error) {
    console.error('Error building idea:', error);
    return NextResponse.json(
      { error: 'Failed to update build data' },
      { status: 500 }
    );
  }
}

// GET /api/ideas/[id]/build - Get build data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const build = await prisma.build.findUnique({
      where: { ideaId: id },
    });

    if (!build) {
      return NextResponse.json({ error: 'Build not found' }, { status: 404 });
    }

    return NextResponse.json(build);
  } catch (error) {
    console.error('Error fetching build:', error);
    return NextResponse.json(
      { error: 'Failed to fetch build data' },
      { status: 500 }
    );
  }
}
