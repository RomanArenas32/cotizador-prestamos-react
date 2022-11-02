import { useEffect, useState } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(500);
  const [meses, setMeses] = useState(Number(6));
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0)

  useEffect(()=>{
    setTotal(calcularTotalPagar(cantidad, meses))
  }, [cantidad, meses])

  useEffect(()=>{
    setPago(total / meses)
  }, [total])

  const MAX = 20000;
  const MIN = 500;
  const STEP = 100;

  function handleChange(e) {
    setCantidad(Number(e.target.value));
  }

  function handleClickDecrement() {
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert("Operacion no valida");
      return;
    }

    setCantidad(valor);
  }

  function handleClickIncrement() {
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert("Cantidad no valida");
      return;
    }

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />
      <div className="flex justify-between my-14">
        <Button operador="-" fn={handleClickDecrement} />
        <Button operador="+" fn={handleClickIncrement} />
      </div>
      <input
        type="range"
        className="w-full h-6 bg-gray-300 accent-lime-500 hover:accent-green-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <div>
        <p className="text-center my-10 text-xl font-extrabold text-indigo-400">
          {formatearDinero(cantidad)}
        </p>

        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className="text-indigo-600 ">Plazo</span> a pagar
        </h2>

        <select
          className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
          value={meses}
          onChange={(e) => setMeses(Number(e.target.value))}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>
      </div>
      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600 ">a pagar</span>
        </h2>
        
        <p className="text-1 text-gray-500 text-center font-bold">{Number(meses)} Meses</p>
        <p className="text-1 text-gray-500 text-center font-bold">{formatearDinero(parseInt(total))} Total a pagar</p>
        <p className="text-1 text-gray-500 text-center font-bold">{formatearDinero(parseInt(pago))}Mensuales</p>
      </div>
    </div>
  );
}

export default App;
