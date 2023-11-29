import React, { useState, useRef, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBroom,
    faCheckCircle,
    faExclamationTriangle,
    faMagnifyingGlass,
    faCheckSquare,
    faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [curriculums, setCurriculums] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const iconRef = useRef(null);

    useEffect(() => {
        const icon = iconRef.current;
        let time = 0;

        function animate() {
            time += 0.02;
            icon.style.transform = `translate(${20 * Math.sin(time)}px, ${7 * Math.sin(2 * time)}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/openai/generateinfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ curriculums }),
            });

            // get the response from the AI model
            const feedback = await response.json();

            // display feedback (response) info
            if (feedback.data) {
                console.log(feedback);
                setFeedback(feedback.data);
                setLoading(false);
            } else {
                setError("No es posible obtener la información.");
                setLoading(false);
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    function handleClear(event) {
        event.preventDefault();
        setCurriculums("");
    }

    return (
        <main className="h-screen">
            <header className="flex items-center justify-between gap-4 px-16 py-4 m-8 bg-red-400 rounded-lg">
                <div className="flex items-center gap-4 text-2xl font-semibold text-white px-2">
                    <FontAwesomeIcon icon={faCheckSquare} />
                    <h1>Lector de CV's con IA 🤖</h1>
                </div>
                <FontAwesomeIcon
                    icon={faIdBadge}
                    className="flex items-center gap-4 text-4xl font-semibold text-white shadow-md rounded border-black hover:bg-black/10 hover:shadow-[3px_3px_0_1px_#671e1e] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all duration-100 hover:cursor-pointer"
                />
            </header>
            <div className="flex items-center flex-col h-full w-full px-64 py-12 gap-8">
                {/* <h1 className="text-5xl font-semibold text-red-400 pb-24">Lector de CV's con IA 🤖</h1> */}
                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
                    {/* <p className="text-xl font-semibold">
                        Introduce los CV's que desees analizar en el siguiente recuadro:
                    </p> */}
                    <textarea
                        value={curriculums}
                        onChange={(event) => setCurriculums(event.target.value)}
                        placeholder="Introduce aqui los CV's que desees analizar!"
                        className="w-full min-h-[200px] max-h-[400px] border border-black rounded-md focus:outline-black p-2"
                    />
                    <div className="flex w-full gap-4">
                        <button
                            type="submit"
                            disabled={curriculums.length < 1}
                            className={` text-white w-full flex items-center justify-center gap-4 text-xl font-semibold py-2 px-4 rounded-lg border border-black ${
                                curriculums.length > 0
                                    ? "bg-blue-400 hover:bg-blue-500 hover:shadow-[3px_3px_0_1px_#000000] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all duration-100 hover:cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                            Analizar
                        </button>

                        <button
                            onClick={handleClear}
                            className="bg-red-400 text-white w-fit flex items-center justify-center gap-2 text-xl font-semibold py-2 px-4 rounded-lg border border-black hover:bg-red-500 hover:shadow-[3px_3px_0_1px_#000000] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all duration-100 hover:cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBroom} className="text-xl" />
                            Limpiar
                        </button>
                    </div>
                </form>
                <div className="flex w-full h-fit flex-col gap-4 bg-black/5 p-8 rounded-md border border-gray-300">
                    {feedback.length < 1 && !loading && (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 py-8">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl" ref={iconRef} />
                            <p className="text-xl font-semibold">Aqui aparecerán los resultados del analisis</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 py-8 text-yellow-400">
                            <CircularProgress thickness={5} color="inherit" />
                            <p className="text-xl font-semibold">Analizando...</p>
                        </div>
                    )}
                    {(!loading && error) || (!loading && feedback.includes("RESPONSE_ERROR")) ? (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 py-8 text-red-400">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl" />
                            <p className="text-xl font-semibold">Error:</p>
                            <p className="text-xl font-semibold text-black">
                                {error
                                    ? error
                                    : "Recuerda que unicamente puedes analizar curriculums con esta herramienta, intenta de nuevo!"}
                            </p>
                        </div>
                    ) : // if there isn't any pending request, nor any error, and the feedback is not empty, then display the feedback
                    feedback && !loading && !feedback.includes("RESPONSE_ERROR") ? (
                        <div className="flex flex-col items-center w-full gap-4">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-400" />
                            <p className="text-xl font-semibold text-green-400">Resultados:</p>
                            <p>
                                {feedback.split("\n").map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
}

export default Home;
