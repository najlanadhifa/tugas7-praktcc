import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/useAuth';

// Custom styles
const customStyles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
    },
    card: {
        backgroundColor: '#121212',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
    },
    header: {
        backgroundColor: '#00D1B2',
        padding: '1rem',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    content: {
        padding: '1.5rem',
        color: '#eaeaea'
    },
    addButton: {
        backgroundColor: '#4CAF50',
        borderRadius: '25px',
        border: 'none',
        color: 'white',
        fontWeight: '600'
    },
    logoutButton: {
        backgroundColor: '#FF5C8D',
        borderRadius: '25px',
        border: 'none',
        color: 'white',
        fontWeight: '600'
    },
    searchInput: {
        backgroundColor: '#1E1E1E',
        color: '#eaeaea',
        border: '1px solid #333',
        borderRadius: '25px',
        padding: '0.75rem 1rem',
        width: '100%'
    },
    noteItem: {
        borderBottom: '1px solid #333',
        padding: '0.75rem 0'
    },
    editButton: {
        backgroundColor: '#3498DB',
        borderRadius: '25px',
        color: 'white',
        border: 'none'
    },
    deleteButton: {
        backgroundColor: '#FF5C8D',
        borderRadius: '25px',
        color: 'white',
        border: 'none'
    },
    footer: {
        borderTop: '1px solid #333',
        padding: '1rem',
        color: '#888',
        textAlign: 'center'
    },
    tableHeader: {
        borderBottom: '2px solid #333',
        padding: '0.75rem 0',
        fontWeight: 'bold',
        color: '#00D1B2'
    },
};

const NoteList = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { accessToken, refreshAccessToken, logout } = useAuth();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setNotes(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch notes:", err);
            if (err.response && err.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    const res = await axios.get(`${BASE_URL}/notes`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    setNotes(res.data);
                } else {
                    console.error("Failed to refresh token. Redirect to login.");
                    navigate("/");
                }
            }
            setIsLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            getNotes();
        } catch (err) {
            console.error("Gagal menghapus:", err);
            if (err.response && err.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    await axios.delete(`${BASE_URL}/notes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    getNotes();
                } else {
                    console.error("Token tidak valid. Arahkan ke login.");
                    navigate("/");
                }
            }
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const filteredNotes = notes.filter(note =>
        note.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={customStyles.container}>
            <div style={customStyles.card}>
                {/* Header */}
                <div style={customStyles.header}>
                    ✍️ My Notes ✍️
                </div>

                {/* Content */}
                <div style={customStyles.content}>
                    {/* Action Buttons */}
                    <div className="is-flex is-justify-content-space-between mb-4">
                        <Link to={`add`} className="button" style={customStyles.addButton}>
                            Tambah Note
                        </Link>

                        <button onClick={handleLogout} className="button" style={customStyles.logoutButton}>
                            Logout
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-5">
                        <input
                            style={customStyles.searchInput}
                            type="text"
                            placeholder="Cari notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Notes List */}
                    {isLoading ? (
                        <div className="has-text-centered my-5">
                            <button className="button is-text is-loading">Loading</button>
                        </div>
                    ) : filteredNotes.length === 0 ? (
                        <div className="has-text-centered my-5" style={{ color: '#888' }}>
                            Tidak ada notes yang ditemukan
                        </div>
                    ) : (
                        <div>
                            {/* Table Header */}
                            <div style={customStyles.tableHeader} className="is-flex is-align-items-center py-3">
                                <div className="mr-3" style={{ width: '30px', textAlign: 'center' }}>
                                    No
                                </div>
                                <div style={{ flex: '1 1 15%' }}>
                                    Nama
                                </div>
                                <div style={{ flex: '1 1 20%' }}>
                                    Judul
                                </div>
                                <div style={{ flex: '1 1 45%' }}>
                                    Isi
                                </div>
                                <div style={{ flex: '0 0 auto', paddingRight: '8px' }}>
                                    Action
                                </div>
                            </div>
                            {filteredNotes.map((note, index) => (
                                <div key={note.id} style={customStyles.noteItem} className="is-flex is-align-items-center py-3">
                                    <div className="mr-3" style={{ width: '30px', textAlign: 'center' }}>
                                        {index + 1}
                                    </div>
                                    <div style={{ flex: '1 1 15%' }}>
                                        {note.nama}
                                    </div>
                                    <div style={{ flex: '1 1 20%' }}>
                                        {note.judul}
                                    </div>
                                    <div style={{ flex: '1 1 45%', color: '#888', fontSize: '0.9rem' }}>
                                        {note.isi.length > 50 ? note.isi.substring(0, 50) + '...' : note.isi}
                                    </div>
                                    <div style={{ flex: '0 0 auto' }}>
                                        <div className="buttons">
                                            <Link to={`edit/${note.id}`} className="button is-small" style={customStyles.editButton}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Apakah anda yakin ingin menghapus note ini?')) {
                                                        deleteNote(note.id)
                                                    }
                                                }}
                                                className="button is-small"
                                                style={customStyles.deleteButton}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={customStyles.footer}>
                    Total Notes: {filteredNotes.length}
                </div>
            </div>
        </div>
    );
};

export default NoteList;