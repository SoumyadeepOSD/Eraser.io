import * as React from 'react';

interface EmailTemplateProps {
    userName: string;
    teamName: string;
    code: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    userName,
    teamName,
    code
}) => (
    <div>
        <h1>`${userName} has sent you invitation`</h1>
        <h1>`To join, ${teamName} Copy and paste the following code in app!`</h1>
        <h2 className="font-bold">Code is ${code}</h2>
    </div>
);
