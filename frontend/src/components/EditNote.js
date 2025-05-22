import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const EditNote = () => {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getNoteById();
  }, []);

    const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/notes/${id}`, {
        nama,
        judul,
        isi,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
};
  
  const getNoteById = async () => {
      const response = await axios.get(`${BASE_URL}/notes/${id}`);
      setNama(response.data.nama);
      setJudul(response.data.judul);
      setIsi(response.data.isi);
    };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="title has-text-centered">✏️ Edit Notes ✏️</h1>
        <form onSubmit={updateNote}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Isi</label>
            <div className="control">
              <textarea
                className="textarea"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Isi"
              ></textarea>
            </div>
          </div>
          <div className="field has-text-centered">
            <button type="submit" className="button is-warning is-dark">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
