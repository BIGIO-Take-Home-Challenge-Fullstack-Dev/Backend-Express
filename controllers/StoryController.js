import Story from "../models/StoryModel.js";
import path from "path";
import fs from "fs";

export const getStory = async (req, res) => {
    try {
        const response = await Story.findAll();

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getStoryById = async (req, res) => {
    try {
        const response = await Story.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const saveStory = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
    const title = req.body.title;
    const author = req.body.author;
    const synopsis = req.body.synopsis;
    const category = req.body.category;
    const tags = req.body.tags;
    const status = req.body.status;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Story.create({
                title: title,
                author: author,
                synopsis: synopsis,
                category: category,
                storyCover: fileName,
                url: url,
                tags: tags.split(','),
                status: status,
            });
            res.status(201).json({ msg: "Story Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
};

export const updateStory = async (req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!story) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = story.storyCover;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000)
            return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${story.storyCover}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const title = req.body.title;
    const author = req.body.author;
    const synopsis = req.body.synopsis;
    const category = req.body.category;
    const tags = req.body.tags;
    const status = req.body.status;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Story.update(
            {
                title: title,
                author: author,
                synopsis: synopsis,
                category: category,
                tags: tags.split(','),
                status: status,
                storyCover: fileName,
                url: url
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Story Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteStory = async (req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!story) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${story.storyCover}`;
        fs.unlinkSync(filepath);
        await Story.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Story Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}