// Temporarily disabled due to compatibility issues with Next.js 15.4.5
// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// Simple middleware that allows all routes for now
export function middleware() {
    // This will be replaced with proper Clerk middleware once compatibility is resolved
}

export const config = {
    matcher: [],
}; 