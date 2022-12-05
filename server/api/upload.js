import fs from "fs";
import express from "express";
import formidable from "formidable";
import protect from "../middlewares/protectedMiddleware.js";
import path from "path";

const router = express.Router();

router.post("/photo", async (request, response) => {
  const form = formidable({});
  form.keepExtensions = true;

  try {
    form.parse(request, (err, fields, files) => {
      if (err) {
        response.status(500).send("Server error");
        return;
      }

      const file = files.photo[0];

      if (file) {
        const arr = file.originalFilename.split(".");
        const fileName = file.newFilename + "." + arr[arr.length - 1];
        const oldPath = file.filepath;
        const newPath =
          path.join(path.resolve(), "server") + "/assets/photo/" + fileName;
        const rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, (err) => {
          if (err) {
            return response.status(500).json({
              message: "Cannot upload file",
            });
          }

          return response.status(200).json({
            message: "File upload succesfully",
            photoUrl: "/static/photo/" + fileName,
          });
        });
      }
    });
    return;
  } catch (error) {
    console.error(error);
    return response.status(500).send("Server error");
  }
});

router.post("/files", protect, async (request, response) => {
  try {
    response.status(200).json({
      message: "File upload succesfully",
    });
    return;
  } catch (error) {
    console.error(error);
    return response.status(500).send("Server error");
  }
});

export default router;
