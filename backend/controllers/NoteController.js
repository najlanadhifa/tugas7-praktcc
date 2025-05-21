import Notes from "../models/NoteModel.js";

export const getNotes = async(req, res)=>{
    try{
        const response = await Notes.findAll();
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const getNotesbyId = async(req, res)=>{
    try{
        const response = await Notes.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const createNote = async(req, res) => {
    try {
        await Notes.create(req.body); 
        res.status(201).json({msg: "Note berhasil dibuat!"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateNote = async(req, res) => {
    try {
        await Notes.update(req.body,{
            where:{
                id: req.params.id
            }
        }); 
        res.status(200).json({msg: "Note berhasil diubah!"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteNote = async(req, res) => {
    try {
        await Notes.destroy({
            where:{
                id: req.params.id
            }
        }); 
        res.status(200).json({msg: "Note dihapus!"});
    } catch (error) {
        console.log(error.message);
    }
}