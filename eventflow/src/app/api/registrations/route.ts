import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(3, "Contact info is required"),
  eventId: z.string().min(1, "Event ID is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registrationSchema.parse(body);

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const registration = await prisma.registration.create({
      data: {
        name: data.name,
        email: data.email,
        contact: data.contact,
        eventId: data.eventId,
      },
    });

    // TODO: Send notification email/telegram mock
    console.log(`[Notification mock] New registration for ${event.title}: ${data.name} (${data.email})`);

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error: any) {
    console.error("Registration Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
