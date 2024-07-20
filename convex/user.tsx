import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSingleUser = query({
    args: {
        email: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('user')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();
        return result;
    }
});


export const createUser = mutation({
    args:{
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        image: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('user', args);
    }
});