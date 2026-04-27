export const dynamic = "force-dynamic";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Guest = {
    id: number;
    name: string;
    attending: boolean;
    created_at: string;
};

async function getGuests(): Promise<Guest[]> {
    const { data, error } = await supabaseAdmin
        .from("guests")
        .select("id, name, attending, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
}

export default async function DashboardPage() {
    const guests = await getGuests();

    return (
        <main className="min-h-screen bg-[#f8fbff] p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#4a8ab5]">
                        Dashboard RSVP
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Lista de invitados confirmados desde Supabase
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-[#dbe9f4] bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-175">
                            <thead className="bg-[#f4f9fd]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                        ID
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                        Nombre
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                        Asistencia
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {guests.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            No hay invitados registrados todavía
                                        </td>
                                    </tr>
                                ) : (
                                    guests.map((guest) => (
                                        <tr
                                            key={guest.id}
                                            className="border-t border-[#eef4f8]"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                #{guest.id}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {guest.name}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-4 py-1 text-sm font-medium ${guest.attending
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {guest.attending
                                                        ? "Sí asistirá"
                                                        : "No asistirá"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(guest.created_at).toLocaleString("es-MX")}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}