import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteList = () => {
    const [notes, setNote] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const response = await axios.get(`${BASE_URL}/notes`);
        setNote(response.data);
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            {/* Tambahkan div baru agar judul berada di tengah atas */}
            <div className="has-text-centered mb-4">
                <h1 className="title">✍️ My Notes ✍️</h1>
            </div>

            <div className="columns is-centered">
                <div className="column is-half">
                    <Link to={`add`} className="button is-warning is-dark mb-3">
                        Tambah Note
                    </Link>
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Isi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={note.id}>
                                    <td>{index + 1}</td>
                                    <td>{note.nama}</td>
                                    <td>{note.judul}</td>
                                    <td>{note.isi}</td>
                                    <td>
                                        <Link to={`edit/${note.id}`} className="button is-small is-white">
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteNote(note.id)} className="button is-small is-warning">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NoteList;
