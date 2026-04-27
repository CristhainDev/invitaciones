type SuccessMessageProps = {
    name: string;
    attending: boolean;
};

export function SuccessMessage({
    name,
    attending,
}: SuccessMessageProps) {
    return (
        <div
            className="success-box"
            style={{
                marginBottom: 18,
                fontFamily: "Lato",
            }}
        >
            <p
                className="t-serif"
                style={{
                    fontSize: 18,
                    color: "#4a8ab5",
                    marginTop: 8,
                    fontWeight: "bold",
                }}
            >
                ¡Gracias, {name}!
            </p>

            {attending ? (
                <p
                    className="t-sans"
                    style={{
                        fontSize: 13,
                        color: "#9a8a72",
                        marginTop: 5,
                        lineHeight: 1.65,
                    }}
                >
                    Tu asistencia ha sido confirmada.
                    <br />
                    ¡Nos vemos el 07 de mayo a la 1:00 PM! 🎈
                </p>
            ) : (
                <p
                    className="t-sans"
                    style={{
                        fontSize: 13,
                        color: "#9a8a72",
                        marginTop: 5,
                        lineHeight: 1.65,
                    }}
                >
                    Lamentamos que no puedas acompañarnos
                    en este día tan especial 💙
                    <br />
                    Agradecemos mucho tu respuesta y esperamos
                    verte pronto.
                </p>
            )}
        </div>
    );
}