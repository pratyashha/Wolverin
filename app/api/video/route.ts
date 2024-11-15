import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

import { incrementApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const REPLICATE_API_TOKEN = process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN;

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN!
})



export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Audio prompt is required", { status: 400 });
        }

        const isFreeTrailLeft = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!isFreeTrailLeft && !isPro) {
            return new NextResponse("Free trail limit exceeded", { status: 403 });
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt
                }
            }
        );

        !isPro && await incrementApiLimit();

        return NextResponse.json(response);

    } catch (error) {
        console.error("[VIDEO ERROR] POST /api/video", error);
        return new NextResponse("Internal Server Error", { status: 500 });

    }
}

