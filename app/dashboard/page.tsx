export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabase-admin";

type Guest = {
    id: number;
    name: string;
    guestsCount: number;
    attending: boolean;
    created_at: string;
};

async function getGuests(): Promise<Guest[]> {
    const { data, error } = await supabaseAdmin
        .from("guests")
        .select("id, name, attending, guestsCount, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
}

export default async function DashboardPage() {
    const guests = await getGuests();

    const totalGuests = guests.reduce(
        (acc, guest) => acc + (guest.guestsCount || 0),
        0
    );

    {/*const totalConfirmed = guests.filter(
        (guest) => guest.attending
    ).length;*/}

    const totalNotAttending = guests.filter(
        (guest) => !guest.attending
    ).length;

    return (
        <main className="min-h-screen bg-[#f8fbff] px-4 py-6 sm:px-6">
            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#4a8ab5]">
                        Dashboard RSVP
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Lista de invitados confirmados desde Supabase
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-[#dbe9f4] bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Total asistentes
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-[#4a8ab5]">
                            {totalGuests}
                        </h2>
                    </div>

                    {/*<div className="rounded-3xl border border-[#dbe9f4] bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Confirmados
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {totalConfirmed}
                        </h2>
                    </div>*/}

                    <div className="rounded-3xl border border-[#dbe9f4] bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            No asistirán
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-red-500">
                            {totalNotAttending}
                        </h2>
                    </div>
                </div>

                {/* Mobile Cards + Desktop Table */}
                <div className="overflow-hidden rounded-3xl border border-[#dbe9f4] bg-white shadow-sm">
                    {guests.length === 0 ? (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            No hay invitados registrados todavía
                        </div>
                    ) : (
                        <>
                            {/* Mobile View */}
                            <div className="block md:hidden">
                                <div className="space-y-4 p-4">
                                    {guests.map((guest) => (
                                        <div
                                            key={guest.id}
                                            className="rounded-2xl border border-[#eef4f8] bg-[#fcfeff] p-4 shadow-sm"
                                        >
                                            <div className="mb-3">
                                                <p className="text-xs font-medium text-gray-400">
                                                    Nombre
                                                </p>
                                                <p className="font-semibold text-gray-800">
                                                    {guest.name}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-xs font-medium text-gray-400">
                                                    Asistencia
                                                </p>

                                                <span
                                                    className={`inline-flex rounded-full px-4 py-1 text-sm font-medium ${guest.attending
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {guest.attending
                                                        ? "Sí asistirá"
                                                        : "No asistirá"}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-gray-400">
                                                    Invitados
                                                </p>
                                                <p className="font-semibold text-[#4a8ab5]">
                                                    {guest.guestsCount}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f4f9fd]">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                                Nombre
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                                Asistencia
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#4a8ab5]">
                                                Invitados
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {guests.map((guest) => (
                                            <tr
                                                key={guest.id}
                                                className="border-t border-[#eef4f8]"
                                            >
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

                                                <td className="px-6 py-4 font-medium text-[#4a8ab5]">
                                                    {guest.guestsCount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}