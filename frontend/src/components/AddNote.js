import React, { useState } from "react";
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
    await axios.post(`${BASE_URL}/notes`, {
      nama,
      judul,
      isi,
    });
    navigate("/dashboard");
  };

  return (
    <section className="section">
      <div className="container">
        <div className="box" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1 className="title has-text-centered">📝 Tambah Notes 📝</h1>

          <form onSubmit={saveNote}>
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
                  rows="5"
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder="Isi"
                ></textarea>
              </div>
            </div>

            <div className="field has-text-centered mt-4">
              <button type="submit" className="button is-primary is-rounded">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNote;
