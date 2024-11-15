import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

import { incrementApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
    basePath: 'https://api.openai.com/v1'
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = "1", resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const isFreeTrailLeft = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!isFreeTrailLeft && !isPro) {
            return new NextResponse("Free trail limit exceeded", { status: 403 });
        }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        !isPro && await incrementApiLimit();

        return NextResponse.json(response.data.data);

    } catch (error) {
        console.error("[IMAGE ERROR] POST /api/image", error);
        return new NextResponse("Internal Server Error", { status: 500 });

    }
}

