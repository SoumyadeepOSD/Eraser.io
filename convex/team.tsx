import {v} from "convex/values";
import { mutation, query } from "./_generated/server";
import { useMutation } from "convex/react";

export const getTeam = query({
    args:{
        email:v.string(),
    },
    handler: async (ctx, args) => {
        const result = ctx.db.query('teams').filter(q=>q.eq(q.field('createdBy'),args.email)).collect();
        return result;     
    }
});

export const getTeamById = query({
    args:{
        _id: v.id('teams'),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args._id);
        return result;
    }
})

export const getTeamByMemberId = query({
    args: {
        memberId: v.string(), // Expect a user ID as input
    },
    handler: async (ctx, args) => {
        const { memberId } = args;

        // Fetch all teams
        const allTeams = await ctx.db.query('teams').collect();

        // Filter teams where the members array contains the given memberId
        const teams = allTeams.filter(team => 
            team.members.includes(memberId)
        );

        return teams;
    }
});
export const CreateTeam = mutation({
    args:{
        teamName: v.string(),
        createdBy: v.string(),
        members: v.array(v.id('user')),
    },
    handler: async(ctx, args)=>{
       const result = await ctx.db.insert('teams', args);
       return result
    }
});

export const updateTeam = mutation({
    args: {
        _id: v.id('teams'),
        members: v.array(v.string()), // Expect an array of user IDs
    },
    handler: async (ctx, args) => {
        const { _id, members } = args;

        // Fetch the current team
        const team = await ctx.db.get(_id);
        if (!team) {
            throw new Error("Team not found");
        }

        // Update the team members
        const updatedMembers = Array.isArray(members) ? members : [members];
        const result = await ctx.db.patch(_id, { members: updatedMembers });
        return result;
    }
});

export const DeleteTeam = mutation({
    args:{
        _id: v.id('teams'),
    },
    handler: async(ctx, args)=>{
        const result = await ctx.db.delete(args._id);
        return result;
    }
});


