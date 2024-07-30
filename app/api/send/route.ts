import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY!
const resend = new Resend(RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, userName, code, teamName } = reqBody;
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Invitation Request',
            react: EmailTemplate({ userName, teamName, code }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
