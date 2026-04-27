type AlreadyRegisteredMessageProps = {
    name: string;
};

export function AlreadyRegisteredMessage({
    name,
}: AlreadyRegisteredMessageProps) {
    return (
        <div
            className="success-box"
            style={{
                marginBottom: 18,
                fontFamily: "Lato",
            }}
        >
            <p
                style={{
                    fontSize: 18,
                    color: "#4a8ab5",
                    marginTop: 8,
                    fontWeight: "bold",
                }}
            >
                ¡Hola, {name}!
            </p>

            <p
                style={{
                    fontSize: 13,
                    color: "#9a8a72",
                    marginTop: 5,
                    lineHeight: 1.65,
                }}
            >
                Ya habías confirmado tu asistencia anteriormente.
                <br />
                ¡Gracias por responder! 💙
            </p>
        </div>
    );
}