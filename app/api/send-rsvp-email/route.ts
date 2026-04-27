
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            guestName,
            attending,
        } = body;

        const { error } = await resend.emails.send({
            from: "Baby Shower <onboarding@resend.dev>",
            to: [
                "rodri.her0808@gmail.com",
            ],
            subject: "Nueva confirmación de asistencia 🎀",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nueva confirmación RSVP</h2>

          <p>
            <strong>Invitado:</strong> ${guestName}
          </p>

          <p>
            <strong>Asistencia:</strong>
            ${attending ? "Sí asistirá" : "No asistirá"}
          </p>

          <br />

          <p>
            Registro enviado desde la invitación digital.
          </p>
        </div>
      `,
        });

        if (error) {
            console.error(error);
            return NextResponse.json(
                { error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Error sending email" },
            { status: 500 }
        );
    }
}