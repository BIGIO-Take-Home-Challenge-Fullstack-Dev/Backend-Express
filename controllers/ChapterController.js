import Chapter from "../models/ChapterModel.js";

export const getChapter = async (req, res) => {
    try {
        const response = await Chapter.findAll();

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getChapterById = async (req, res) => {
    try {
        const response = await Chapter.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const saveChapter = async (req, res) => {
    const { title } = req.body;
    try {
        await Chapter.create({
            title: title,
        });

        res.json({ msg: "Data Created" });
    } catch (error) {
        console.log(error);
    }
};

export const updateChapter = async (req, res) => {
    try {
        await Chapter.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Chapter Updated" })
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteChapter = async (req, res) => {
    try {
        await Chapter.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Chapter Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};