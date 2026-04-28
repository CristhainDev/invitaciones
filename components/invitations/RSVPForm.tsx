"use client";

import { useState } from "react";
import { GiftIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import "../../app/globals.css";

type RSVPFormProps = {
  name: string;
  attending: boolean;
  guestsCount: number;
  setGuestsCount: (value: number) => void;
  setAttending: (value: boolean) => void;
  setName: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function RSVPForm({
  name,
  setAttending,
  attending,
  guestsCount,
  setGuestsCount,
  setName,
  handleSubmit,
}: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (guestsCount > 3) {
      alert("El máximo permitido es de 3 asistentes");
      return;
    }

    setIsSubmitting(true);

    try {
      await handleSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-box" style={{ marginBottom: 18 }}>
      <h2
        className="t-serif"
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "#4a8ab5",
          marginBottom: 12,
          fontFamily: "Lato",
          fontWeight: "bold",
        }}
      >
        Confirmar asistencia
      </h2>

      {/* Divider */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-line" />
      </div>

      <p
        className="t-sans"
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#9a8a72",
          lineHeight: 1.7,
          marginBottom: 18,
          fontFamily: "Lato",
          fontWeight: "bolder",
        }}
      >
        Tu presencia será nuestro mejor regalo 💙 <br />
        Si deseas tener un detalle especial,
        un sobre de obsequio será bien recibido.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          marginBottom: 18,
          fontSize: "13px",
          color: "#9a8a72",
        }}
      >
        <GiftIcon
          style={{
            width: "25px",
            height: "25px",
            flexShrink: 0,
            color: "#7fb3d3",
          }}
        />

        o

        <EnvelopeIcon
          style={{
            width: "25px",
            height: "25px",
            flexShrink: 0,
            color: "#7fb3d3",
          }}
        />
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "6px",
          }}
        >
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setAttending(true)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "14px",
              border: "2px solid #b8d8f0",
              background: attending ? "#7fb3d3" : "white",
              color: attending ? "white" : "#4a8ab5",
              fontFamily: "Lato",
              fontWeight: 700,
              fontSize: "12px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: attending
                ? "0 6px 18px rgba(127,179,211,0.25)"
                : "none",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            ✓ Asistiré
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setAttending(false)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "14px",
              border: "2px solid #f0d4d4",
              background:
                attending === false ? "#d89a9a" : "white",
              color:
                attending === false ? "white" : "#a56b6b",
              fontFamily: "Lato",
              fontWeight: 700,
              fontSize: "12px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                attending === false
                  ? "0 6px 18px rgba(216,154,154,0.20)"
                  : "none",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            ✕ No podré asistir
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold tracking-wide text-center"
            style={{
              color: "#4a8ab5",
              fontFamily: "Lato",
            }}
          >
            Nombre:
          </label>

          <input
            className="form-input"
            type="text"
            placeholder="Escribe tu nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              fontFamily: "Lato",
              borderRadius: "14px",
              padding: "14px 16px",
              border: "1.5px solid #dbe9f4",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(74,138,181,0.05)",
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold tracking-wide text-center"
            style={{
              color: "#4a8ab5",
              fontFamily: "Lato",
            }}
          >
            Invitados:
          </label>

          <input
            className="form-input"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            max={3}
            placeholder="Máximo 3 asistentes"
            value={guestsCount}
            onChange={(e) =>
              setGuestsCount(Number(e.target.value))
            }
            required
            disabled={isSubmitting}
            style={{
              fontFamily: "Lato",
              borderRadius: "14px",
              padding: "14px 16px",
              border: "1.5px solid #dbe9f4",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(74,138,181,0.05)",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            opacity: isSubmitting ? 0.75 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting
            ? "Enviando..."
            : "✓ Confirmar asistencia"}
        </button>
      </form>
    </div>
  );
}