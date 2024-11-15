import { auth } from "@clerk/nextjs"

import { MAX_FREE_COUNT } from "@/constants"

import prismadb from "./prismadb"

export const incrementApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {

        await prismadb.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });

    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        });
    }

};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit && (userApiLimit.count >= MAX_FREE_COUNT)) {
        return false;
    } else {
        return true;
    }
}

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) return 0;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        return userApiLimit.count;
    } else {
        return 0;
    }
}