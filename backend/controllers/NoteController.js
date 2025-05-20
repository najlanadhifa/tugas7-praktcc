import Notes from "../models/NoteModel.js";

// GET all notes for authenticated user
export const getNotes = async (req, res) => {
  const id = req.user.id;
  try {
    const notes = await Notes.findAll({ where: { userId: id } });
    res.status(200).json({
      message: "Notes berhasil diambil",
      userId: id,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET note by ID
export const getNotesbyId = async(req, res) => {
    try {
        const response = await Notes.findOne({
            where:{
                id: req.params.id
            }
        }); 
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// CREATE new note
export const createNote = async(req, res) => {
    const { judul, isi, nama } = req.body;
    const id = req.user.id;
    try {
        const notes = await Notes.create({
            judul,
            isi,
            nama,
            userId: id,
        });
        res.status(201).json({
            message: "Notes berhasil dibuat",
            userId: id,
            data: notes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// UPDATE note
export const updateNote = async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { judul, isi, nama } = req.body;
    try {
        const notes = await Notes.update(
            {
                judul,
                isi,
                nama,
            },
            {
                where: {
                    id,
                }
            }
        );
        res.status(200).json({
            message: "Notes berhasil diupdate",
            userId,
            data: notes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// DELETE note
export const deleteNote = async(req, res) => {
    const { id } = req.params;
    console.log("ID NOTES = ", id);
    const userId = req.user.id;
    try {
        const notes = await Notes.destroy({
            where: {
                id,
            }
        });
        res.status(200).json({
            message: "Notes berhasil dihapus",
            userId,
            data: notes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}