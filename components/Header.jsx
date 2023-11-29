import { faCheckSquare, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
    return (
        <header className="flex items-center justify-between gap-4 px-16 py-4 m-8 bg-red-400 rounded-lg">
            <div className="flex items-center gap-4 text-2xl font-semibold text-white px-2 shadow-md rounded-lg border-black hover:bg-black/10 hover:shadow-[3px_3px_0_1px_#671e1e] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all duration-100 hover:cursor-pointer">
                <FontAwesomeIcon icon={faCheckSquare} />
                <h1>Lector de CV's con IA 🤖</h1>
            </div>
            <FontAwesomeIcon
                icon={faIdBadge}
                className="flex items-center gap-4 text-4xl font-semibold text-white shadow-md rounded border-black hover:bg-black/10 hover:shadow-[3px_3px_0_1px_#671e1e] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all duration-100 hover:cursor-pointer"
            />
        </header>
    );
};

export default Header;
