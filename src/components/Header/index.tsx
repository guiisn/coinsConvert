import React from 'react';

import '../../index.css';

function Header() {
    return (
        <div className=" w-full h-1/4 flex flex-col justify-end items-center">
            <h1 className="title text-text">Conversor de moedas</h1>
            <span className="text-text">
                Selecione as moedas e digite o valor.
            </span>
        </div>
    );
}

export default Header;
