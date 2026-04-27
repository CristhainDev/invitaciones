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
        <div style="
          font-family: Arial, sans-serif;
          background: #f8fbff;
          padding: 30px;
          color: #3a3a3a;
        ">
          <div style="
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 18px;
            padding: 32px;
            border: 1px solid #e6eef7;
            box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          ">
            
            <h1 style="
              margin: 0 0 10px;
              color: #4a8ab5;
              font-size: 24px;
              text-align: center;
            ">
              Nueva confirmación RSVP 🎀
            </h1>

            <p style="
              text-align: center;
              color: #8a7b68;
              font-size: 14px;
              margin-bottom: 28px;
            ">
              Se ha registrado una nueva respuesta en la invitación digital
            </p>

            <div style="
              background: #f7fbff;
              border: 1px solid #dbeaf7;
              border-radius: 14px;
              padding: 20px;
              margin-bottom: 20px;
            ">
              <p style="margin: 0 0 12px;">
                <strong>Invitado:</strong><br />
                ${guestName}
              </p>

              <p style="margin: 0;">
                <strong>Confirmación:</strong><br />
                ${attending
                    ? "✅ Sí asistirá al evento"
                    : "❌ No podrá asistir"
                }
              </p>
            </div>

            <p style="
              font-size: 14px;
              line-height: 1.7;
              color: #6b5a42;
              margin-bottom: 24px;
            ">
              Puedes revisar la lista completa de invitados y confirmaciones
              desde el dashboard administrativo:
            </p>

            <div style="text-align: center; margin-bottom: 28px;">
              <a
                href="https://invitaciones-gamma.vercel.app/dashboard"
                target="_blank"
                style="
                  display: inline-block;
                  background: #4a8ab5;
                  color: white;
                  text-decoration: none;
                  padding: 14px 24px;
                  border-radius: 999px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                Ver dashboard de invitados
              </a>
            </div>

            <hr style="
              border: none;
              border-top: 1px solid #edf2f7;
              margin: 24px 0;
            " />

            <p style="
              font-size: 12px;
              color: #9a8a72;
              text-align: center;
              margin: 0;
            ">
              Este registro fue enviado automáticamente desde la invitación web
              del Baby Shower 💙
            </p>
          </div>
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