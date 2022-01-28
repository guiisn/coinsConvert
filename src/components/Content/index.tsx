import React, { useState } from 'react';

import { api } from '../../services/api';
import { values } from '../../utils/values';

import '../../index.css';

function Content() {
    const [select1, setSelect1] = useState('');
    const [select2, setSelect2] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState(0.0);

    const handleChange = (event: any) => {
        event.target.name === 'select1'
            ? setSelect1(event.target.value)
            : event.target.name === 'select2'
            ? setSelect2(event.target.value)
            : event.target.name === 'value' && setValue(event.target.value);
    };

    const convert = async (event: any) => {
        event.preventDefault();
        value !== '' &&
            (await api.get(`${select1}-${select2}`).then((response: any) => {
                const data = response.data[`${select1}${select2}`];
                const resultado = parseFloat(value) * parseFloat(data.ask);
                setResult(resultado);
            }));
    };

    return (
        <div className=" w-full h-3/4 flex flex-col justify-center items-center">
            <form
                onSubmit={convert}
                className="bg-text w-3/4 lg:w-1/2 rounded-2xl shadow-2xl p-4 "
            >
                <div className="flex flex-col lg:flex-row justify-between gap-4 h-1/2">
                    <div className="w-full flex flex-col gap-4 h-1/2 justify-between pt-5 pb-5">
                        <select
                            required
                            onChange={handleChange}
                            className="outline-none w-full p-3 rounded-xl bg-transparent border border-secondary"
                            name="select1"
                        >
                            <option value="">Selecione a moeda</option>
                            {values.map((response: any, index: any) => (
                                <option value={response.value} key={index}>
                                    {response.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="search"
                            className={
                                select1 === ''
                                    ? 'p-3 border border-gray-400 rounded-md w-full outline-none'
                                    : 'p-3 border border-secondary rounded-md w-full outline-none'
                            }
                            placeholder={
                                select1 !== ''
                                    ? `Digite o valor em ${select1}`
                                    : 'Escolha a moeda'
                            }
                            disabled={select1 === '' && true}
                            required
                            name="value"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="h-full border-black border hidden lg:block" />
                    <div className="w-full h-1/2 justify-between pt-5 pb-5 flex flex-col gap-4">
                        <select
                            required
                            onChange={handleChange}
                            name="select2"
                            className="outline-none w-full p-3 rounded-xl bg-transparent border border-secondary"
                        >
                            <option value="">Selecione a moeda</option>
                            {values.map((response: any, index: any) => (
                                <option value={response.value} key={index}>
                                    {response.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="search"
                            className={
                                'p-3 border border-gray-400 rounded-md w-full outline-none'
                            }
                            placeholder={`O resultado aparecerá aqui. `}
                            value={result.toString().replace('.', ',')}
                            disabled
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-14 lg:mt10">
                    <button
                        className="p-4 bg-secondary rounded-lg border border-secondary hover:bg-transparent"
                        type="submit"
                    >
                        Converter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Content;
