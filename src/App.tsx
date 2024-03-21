import { useState } from "react";
import "./App.css";

function App() {
  // TAB
  const [activeTab, setActiveTab] = useState("emissorComum");
  
  // Circuito Emissor Comum 
  const [vbb, setVbb] = useState(Number);
  const [rb, setRb] = useState(Number);
  const [bcc, setBcc] = useState(Number);
  const [rc, setRc] = useState(Number);
  const [vcc, setVcc] = useState(Number);

  // Circuito Emissor - FC
  const [vbbFC, setVbbFC] = useState(Number)
  const [reFC, setReFC] = useState(Number)
  const [vccFC, setVccFC] = useState(Number)
  const [rcFC, setRcFC] = useState(Number)
  const [bccFC, setBccFC] = useState(Number)
  
  // Divisor tensão
  const [vccDT, setVccDT] = useState(Number)
  // eslint-disable-next-line prefer-const
  let [r1DT, setR1DT] = useState(Number);
  // eslint-disable-next-line prefer-const
  let [r2DT, setR2DT] = useState(Number);
  // eslint-disable-next-line prefer-const
  let [rcDT, setRcDT] = useState(Number);
  // eslint-disable-next-line prefer-const
  let [reDT, setReDT] = useState(Number);
  const [tipoDT, setTipoDT] = useState("comum");
  


  const current = (v: number, r: number) => {
    const vbe = 0.7;
    return (v - vbe) / r;
  };

  const power = (v: number, i: number) => {
    return v * i;
  };

  const calculateEmissorComum = () => {
    if (!vbb || !rb || !bcc || !bcc || !rc || !vcc) {
      alert("Inputs inválidos");
      return;
    }

    const ib = current(vbb, rb);
    const ic = bcc * ib;
    const vce = vcc - (rc * ic);
    const pd = power(vce, ic);

    const formattedResults = `
		  Corrente Ib: ${ib}
		  Corrente Ic: ${ic}
		  Tensão Vce: ${vce}
		  Potência dissipada no transistor Pd: ${pd}`;

    alert(formattedResults);
  };

  const calculateEmissorFC = () => {
    if (!vccFC || !vbbFC || !reFC || !rcFC || !bccFC) {
      alert("Inputs inválidos");
      return;
    }
    const Vtransistor = 0
    const Re = reFC;
  
    const Icmax = vccFC / (rcFC + Re);
    const Ie = (vbbFC - Vtransistor) / Re;
  
    if (Ie > Icmax) {
      console.log("Ie > Icmax, transistor em saturação");
      const Vce = vccFC - (Icmax * rcFC) - (Icmax * Re);
      const Pd = Vce * Icmax;
      console.log("Vce: ", Vce);
      console.log("Pd: ", Pd);
      
      const formattedResults = `
      Ie > Icmax, transistor em saturação
		  Vce: ${Vce}
		  Pd: ${Pd}`;
      alert(formattedResults)
    } else if (Ie === Icmax) {
      console.log("Ie = Icmax, transistor em saturação");
      const Vce = vccFC - (Ie * rcFC) - (Ie * Re);
      const Pd = Vce * Ie;
      console.log("Vce: ", Vce);
      console.log("Pd: ", Pd);

      const formattedResults = `
        Ie = Icmax, transistor em saturação
        Vce: ${Vce}
        Pd: ${Pd}`;

      alert(formattedResults)
    } else {
      console.log("Transistor em estado ativo");
      const Vce = vccFC - (Ie * rcFC) - (Ie * Re);
      const Pd = Vce * Ie;
      console.log("Vce: ", Vce);
      console.log("Pd: ", Pd);
      const formattedResults = `
        Transistor em estado ativo
        Vce: ${Vce}
        Pd: ${Pd}
      `
      alert(formattedResults)
    }
  };
  

  const calculateDivisorTensao = () => {
    if (!vccDT || !r1DT || !r2DT || !rcDT || !reDT) {
      alert("Inputs inválidos");
      return;
    }

    const Vtransistor = 0;
  

    const dicionario = {
      estado: "",
      Icmax: vccDT / rcDT + reDT,
      Vcc: vccDT,
      Vb: 0,
      Vbe: 0,
      Ie: 0,
      Vce: 0,
      Pd: 0,
    };

    if (tipoDT === "p") {
      console.log("P")
      let aux = r1DT;
      r1DT = r2DT
      r2DT = aux
      aux = rcDT
      rcDT = reDT
      reDT = aux
    }

    dicionario.Vb = (vccDT * r2DT) / (r1DT + r2DT);
    dicionario.Vbe = dicionario.Vb - Vtransistor;
    dicionario.Ie = dicionario.Vbe / rcDT;
    let result = ""
    if (dicionario.Ie > dicionario.Icmax) {
      result = "Ie > Icmax, transistor em saturação"
      console.log("Ie > Icmax, transistor em saturação");
      dicionario.estado = "acima saturacao";
      dicionario.Vce = vccDT - dicionario.Icmax * rcDT;
      dicionario.Pd = dicionario.Vce * dicionario.Icmax;
    } else if (dicionario.Ie === dicionario.Icmax) {
      result = "Ie = Icmax, transistor em saturacao"
      console.log("Ie = Icmax, transistor em saturacao");
      dicionario.estado = "saturado";
      dicionario.Vce = vccDT - dicionario.Ie * rcDT - dicionario.Ie * reDT;
      dicionario.Pd = dicionario.Vce * dicionario.Ie;
    } else {
      result = "ativo"
      dicionario.estado = "ativo";
      dicionario.Vce = vccDT - dicionario.Ie * rcDT - dicionario.Ie * reDT;
      dicionario.Pd = dicionario.Vce * dicionario.Ie;
    }

    alert(result + JSON.stringify(dicionario))
  }

  return (
    <>
      <div className="header">
        <h1>Calculadora Eletrônica 1</h1>
      </div>
      <div className="tab-container">
        <div className="tabs">
          <button
            className={activeTab === "emissorComum" ? "active" : ""}
            onClick={() => setActiveTab("emissorComum")}
          >
            Calcular Emissor Comum
          </button>
          <button
            className={activeTab === "emissorComumFC" ? "active" : ""}
            onClick={() => setActiveTab("emissorComumFC")}
          >
            Calcular Emissor - Fonte de Corrente
          </button>
          <button
            className={activeTab === "divisorTensao" ? "active" : ""}
            onClick={() => setActiveTab("divisorTensao")}
          >
            Calcular Divisor de Tensão
          </button>
        </div>
        <div className="container-body">
          {activeTab === "emissorComum" && (
            <>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="vbb"
                  onChange={(e) => setVbb(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Vbb"
                />
              </div>

              <div className="inputContainer">
                <input
                  type="Number"
                  id="rb"
                  onChange={(e) => setRb(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Rb"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="bcc"
                  onChange={(e) => setBcc(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Bcc"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="rc"
                  onChange={(e) => setRc(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Rc"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="vcc"
                  onChange={(e) => setVcc(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Vcc"
                />
              </div>
              <button style={styles.button} onClick={calculateEmissorComum}>
                Calcular!
              </button>
            </>
          )}

          {activeTab === "emissorComumFC" && (
            <>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="vbbFC"
                  onChange={(e) => setVbbFC(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Vbb"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="Re"
                  onChange={(e) => setReFC(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Re"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="VccFC"
                  onChange={(e) => setVccFC(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Vcc"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="RcFC"
                  onChange={(e) => setRcFC(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Rc"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="BccFC"
                  onChange={(e) => setBccFC(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Bcc"
                />
              </div>

              <button style={styles.button} onClick={calculateEmissorFC}>
                Calcular!
              </button>

            </>
          )}

          {activeTab === "divisorTensao" && (
            <>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="vccDT"
                  onChange={(e) => setVccDT(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Vcc (V)"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="r1DT"
                  onChange={(e) => setR1DT(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="R1 (Ohms)"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="r2DT"
                  onChange={(e) => setR2DT(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="R2 (Ohms)"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="rcDT"
                  onChange={(e) => setRcDT(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Rc (Ohms)"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="Number"
                  id="reDT"
                  onChange={(e) => setReDT(e.target.valueAsNumber)}
                  style={styles.input}
                  placeholder="Re (Ohms)"
                />
              </div>
              <div className="inputContainer">
                <select
                  id="tipoDT"
                  onChange={(e) => setTipoDT(e.target.value)}
                  style={styles.input}
                >
                  <option value="p">P-Comum</option>
                  <option value="n">N-Comum</option>
                </select>
              </div>
              <button style={styles.button} onClick={calculateDivisorTensao}>
                Calcular!
              </button>
            </>
          )}
        </div>
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
