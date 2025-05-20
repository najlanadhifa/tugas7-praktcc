import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import useAuth from '../auth/useAuth';

const EditNote = () => {
    const { accessToken, refreshAccessToken } = useAuth();
    const [nama, setNama] = useState("");
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        getNotesById();
      }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `${BASE_URL}/notes/${id}`,
                { nama, judul, isi },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            navigate("/");
        } catch (error) {
            console.log(error);        
        }
    };

    const getNotesById = async () =>{
        try {
        const response = await axios.get(`${BASE_URL}/notes/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setNama(response.data.nama);
        setJudul(response.data.judul);
        setIsi(response.data.isi);
    } catch (error) {
        if (error.response?.status === 401) {
            try {
                await refreshAccessToken(); // refresh token
                // panggil ulang fungsi ini setelah refresh
                const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }                   
                });
                setNama(response.data.nama);
                setJudul(response.data.judul);
                setIsi(response.data.isi);
            } catch (err) {
                console.error("Gagal refresh token:", err);
            }
        } else {
            console.error("Gagal mengambil data user:", error);
        }
    }
};
    
  return (
    <div className="columns mt-5 is-centered">
        <div className="columns is-half">
            <form onSubmit={updateNote}>
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
                <button type='submit' className='button is-warning is-dark'>Update</button>
            </form>
        </div>
    </div>
  );
};

export default EditNote;
