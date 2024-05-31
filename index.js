const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

class ImageStorage {
  constructor() {
    this.options = {};
  }
  option(options) {
    if (!options.api_url || !options.api_key) {
      throw new Error("api_url та api_key обов'язкові параметри");
    }
    this.options = options;
  }
  async getImage(fileName) {}
  async uploadImage(file) {
    try {
      const isCorrectImage = await this.checkFile(file);
      if (isCorrectImage.success) {
        const form = new FormData();
        form.append("file", fs.createReadStream(file.path), file.originalname);
        const response = await axios.post(this.options.api_url, form, {
          headers: {
            "x-api-key": this.options.api_key,
            "Content-Type": "multipart/form-data",
          },
        });
        const { success, image_name, message } = response.data;
        return { success: success, image_name: image_name, message: message };
      } else {
        return {
          success: isCorrectImage.success,
          message: isCorrectImage.message,
        };
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async deleteImage(delete_fileName) {
    try {
      if (delete_fileName) {
        const deleteResponse = await axios.delete(
          `${this.options.api_url}/${delete_fileName}`,
          {
            headers: {
              "x-api-key": this.options.api_key,
            },
          }
        );
        const { success, message } = deleteResponse.data;
        return { success: success, message: message };
      } else {
        return { success: false, message: "Необхідно передати назву файла" };
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async updateImage({ update_fileName, file }) {
    try {
      const isCorrectImage = await this.checkFile(file);
      if (isCorrectImage.success && update_fileName) {
        const deleteResponse = await this.deleteImage(update_fileName);
        console.log(deleteResponse.success);
        if (deleteResponse.success) {
          const uploadResponse = await this.uploadImage(file);
          if (uploadResponse.success)
            return {
              success: true,
              message: "Зображення успішно змінено",
              image_name: uploadResponse.image_name,
            };
        } else {
          return {
            success: false,
            message: `Не знайдено зображення з назвою "${update_fileName}" для заміни`,
          };
        }
      } else {
        return {
          success: isCorrectImage.success,
          message: `${isCorrectImage.message}${
            update_fileName ? "" : ", Введіть назву зображення для заміни"
          }`,
        };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async checkFile(file) {
    try {
      if (file && file.path) {
        if (file.mimetype.startsWith("image/")) {
          return { success: true, message: "Файл правильний" };
        } else {
          return {
            success: false,
            message: `Файл повинен бути типу \"image\". Тип файлу: ${
              file.mimetype.split("/")[0]
            }`,
          };
        }
      } else {
        return {
          success: false,
          message: "Необхідно додати файл або неправильно передані дані",
        };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: "Сталась помилка" };
    }
  }
}

module.exports = new ImageStorage();
