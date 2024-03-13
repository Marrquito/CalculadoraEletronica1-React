import { useState } from "react";
import "./App.css";

function App() {
  //   const [count, setCount] = useState(0);
  const [vbb, setVbb] = useState("");
  const [rb, setRb] = useState("");
  const [bcc, setBcc] = useState("");
  const [rc, setRc] = useState("");
  const [vcc, setVcc] = useState("");

  const current = (v: number, r: number): number => {
    const vbe = 0.07;
    return (v - vbe) / r;
  };

  const power = (v: number, i: number): number => {
    return v * i;
  };

  const calculate = () => {
	if(!vbb || !rb || !bcc || !bcc || !rc || !vcc) {
		alert("Invalid inputs")

		return
	}


    const ib = current(Number(vbb), Number(rb));
    const ic = Number(bcc) * ib;
    const vce = Number(vcc) - Number(rc) * ic;
    const pd = power(vce, ic);

    const formattedResults = `
		  Corrente Ib: ${ib}
		  Corrente Ic: ${ic}
		  Tensão Vce: ${vce}
		  Potência dissipada no transistor Pd: ${pd}`;

    alert(formattedResults);
  };

  return (
    <>
      <div className="header">
        <h1>Calculadora Eletronica 1</h1>
      </div>
      <div className="container-body">
        <div className="inputContainer">
          <input
            type="Number"
            id="vbb"
            value={vbb}
            onChange={(e) => setVbb(e.target.value)}
            style={styles.input}
            placeholder="Vbb"
          />
        </div>

        <div className="inputContainer">
          <input
            type="Number"
            id="rb"
            value={rb}
            onChange={(e) => setRb(e.target.value)}
            style={styles.input}
            placeholder="Rb"
          />
        </div>
        <div className="inputContainer">
          <input
            type="Number"
            id="bcc"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            style={styles.input}
            placeholder="Bcc"
          />
        </div>
        <div className="inputContainer">
          <input
            type="Number"
            id="rc"
            value={rc}
            onChange={(e) => setRc(e.target.value)}
            style={styles.input}
            placeholder="Rc"
          />
        </div>
        <div className="inputContainer">
          <input
            type="Number"
            id="vcc"
            value={vcc}
            onChange={(e) => setVcc(e.target.value)}
            style={styles.input}
            placeholder="Vcc"
          />
        </div>
		<button style={styles.button} onClick={calculate}>
			Calcular!
		</button>
      </div>
    </>
  );
}

const styles = {
  input: {
    marginLeft: "10px",
    height: "40px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #0EDF4A",
    borderRadius: "5px",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: "5vh",
    width: "250px",
    backgroundColor: "#f1bf",
    color: "black",
  },
};

export default App;
