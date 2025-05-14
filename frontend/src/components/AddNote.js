import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const AddNote = () => {
    const [nama, setNama] = useState("");
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/notes`,{
                nama,
                judul, 
                isi
            });
            navigate("/");
        } catch (error) {
            console.log(error);        
        }
    };

  return (
    <div className="columns mt-5 is-centered">
        <div className="columns is-half">
            <form onSubmit={saveNote}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" value={nama} onChange={(e)=>setNama(e.target.value)} placeholder='Nama'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Judul</label>
                    <div className="control">
                        <input type="text" className="input" value={judul} onChange={(e)=>setJudul(e.target.value)} placeholder='Judul'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Isi</label>
                    <div className="control">
                        <input type="text" className="input" value={isi} onChange={(e)=>setIsi(e.target.value)} placeholder='Isi'/>
                    </div>
                </div>
                <div className="field"></div>
                <button type='submit' className='button is-warning is-dark'>Simpan</button>
            </form>
        </div>
    </div>
  );
};

export default AddNote;
