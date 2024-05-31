# NodeImageStorage

**`node-image-storage`** is an easy-to-use Node.js module for managing image uploads, deletions, and updates via an external API.

### Description of node-image-storage Package
## Purpose
The node-image-storage package is designed for convenient management of images by providing functionality for uploading, deleting, and updating files through an external API. It simplifies the process of integrating image handling capabilities into your Node.js application.

## Features

#### Image Upload:
Checks file type before uploading.
Converts all images to webp format (except SVG, which are kept in their original format).
Assigns unique names to all uploaded files.
Uploads files to an external server using an API key for authentication.

#### Get Images:
Retrieves images by their names.

#### Delete Images:
Deletes files from the external server using an API key.

#### Update Images:
Updates existing image files by deleting the old file and uploading a new one.

#### Example Usage
```javascript
const ImageStorage = require('node-image-storage');

// Initialize with API parameters
ImageStorage.option({
  api_url: 'https://your-api-url.com/uploads',
  api_key: 'your-api-key'
});

// Upload an image
ImageStorage.uploadImage(file).then(response => {
  console.log(response);
});

// Delete an image
ImageStorage.deleteImage('image-name.webp').then(response => {
  console.log(response);
});

// Update an image
ImageStorage.updateImage({
  update_fileName: 'old-image-name.webp',
  file: newFile
}).then(response => {
  console.log(response);
});
```

##### Setting Up the Image Storage Server

1. Clone the repository
    ``` bash
    git clone https://github.com/Subm1s/image-storage-server
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    PORT=5000
    API_KEY=your-api-key
    ```
4. Run the server:

    ```bash
    npm start
    ```
    The server will start on the specified port (e.g., http://localhost:5000).

#### Installation

Install the `NodeImageStorage` package using npm:

```bash
npm install node-image-storage
```

#### Usage
```javascript
const ImageStorage = require('node-image-storage')
```

#### Before using the module, configure it with your API_URL and API_KEY

```javascript
ImageStorage.option({
  api_url: 'http://localhost:5000/uploads',
  api_key: 'your-api-key',
})
```
<span style="color:red">```api_url``` and ```api_key``` must be a string</span>

### Uploading an Image
```javascript
async ImageStorage.uploadImage(file)
```

<span style="color:red">The ```file``` must be an **<span style="color:red">OBJECT**.</span>

Return data:
```javascript
return { success, image_name, message };
```
```success``` = ```Boolean```
```image_name``` = ```String```  
```message``` = ```String```  

### Deleting an Image

```javascript
async ImageStorage.deleteImage(fileName)
```

<span style="color:red">The ```fileName``` must be an **<span style="color:red">STRING**.</span>

Return data:
```javascript
return { success, message };
```
```success``` = ```Boolean```
```message``` = ```String```  

### Updating an Image

```javascript
const updateDetails = {
    update_fileName: fileName,
    file: file,
}

async ImageStorage.updateImage(updateDetails)
```

<span style="color:red">The ```fileName``` must be an **<span style="color:red">STRING**.</span>
    <span style="color:red">The ```file``` must be an **<span style="color:red">OBJECT**.</span>

Return data:
```javascript
return { success, image_name, message };
```
```success``` = ```Boolean```
```image_name``` = ```String```  
```message``` = ```String```  