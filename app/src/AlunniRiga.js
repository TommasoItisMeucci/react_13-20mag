import {useState} from 'react';

export default function AlunniTable(props){
    const a = props.alunno;
    const caricaAlunni = props.caricaAlunni;

    const [conferma, setConferma] = useState(false);
    const [cancellato, setCancellato] = useState(false);

    const [modifica, setModificato] = useState(false);
    const [nome, setNome] = useState(a.nome);
    const [cognome, setCognome] = useState(a.cognome);

    
    async function eliminaAlunno(){
        const data = await fetch(`http://localhost:8080/alunni/${a.id}` , {method:"DELETE"});
        caricaAlunni();
        setCancellato(true);
    }

    async function aggiornaAlunno(evento) {
        const data = await fetch(`http://localhost:8080/alunni/${a.id}` , {
            method:"PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome : nome, cognome : cognome})
            })
        setModificato(false);
        caricaAlunni();
    }
    

    return(
        <>
        {!cancellato &&
        <tr>
            {modifica ? (
                <>
                    <td>{a.id}</td>
                    <td><input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/></td>
                    <td><input type="text" value={cognome} onChange={(e) => setCognome(e.target.value)}/></td>
                </>
            ):(
                <>
                    <td>{a.id}</td>
                    <td>{a.nome}</td>
                    <td>{a.cognome}</td>
                </>
            )}
            <td> 
                {conferma ? (
                    <div>
                        sei sicuro? 
                        <button onClick={eliminaAlunno}>si</button>
                        <button onClick={() => setConferma(false)}>no</button>
                    </div>
                ):(
                    <>
                    {modifica ? (
                    <div>
                        <button onClick={aggiornaAlunno}>salva</button>
                        <button onClick={() => setModificato(false)}>annulla</button>
                    </div>
                    ):(
                        <div>
                            <button onClick={() => setConferma(true)}>elimina</button>
                            <button onClick={() => setModificato(true)}>edit</button>
                        </div>
                    )
                    }
                    </>
                )}
                
            </td>
        </tr>

        }
        </>
        
    );
}