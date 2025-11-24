import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    hasResend: !!process.env.RESEND_API_KEY,
    hasGmail: !!(process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD),
    emailTo: process.env.EMAIL_TO,
    resendKey: process.env.RESEND_API_KEY ? 'SET (hidden)' : 'NOT SET',
  };
  
  return NextResponse.json(config);
}
