import { useState, useEffect } from "react";
import { client } from "filestack-react";

export default function App() {
  const [file, setFile] = useState(null);

  const customSource = {
    label: 'LABEL_IN_MENU',
    name: 'CUSTOM_SOURCE_KEY_NAME',
    icon: 'ICON.svg',
    mounted: (element, actions) => {
  
    },
    unmounted: (element) => {
   
    }
  }

  const filePickerOptions = {
    fromSources: [ 
      'local_file_system', 
      customSource,
      'box',
      'facebook',
      'instagram',
      'dropbox',
      'googledrive',
      'googlephotos',
      //'googlegmail',
      //'googlesearch',
      'github',
      'onedrive',
      'unsplash'
    ],
    accept: "image/*",
    maxSize: 1024 * 1024,
    maxFiles: 1,
    //onFileUploadFinished: this.setcanvasBG,
    onUploadDone: (file) => setFile(file)
  };

  useEffect(() => {
    // send file to your custom server
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(file),
      headers: { "Content-type": "application/json" }
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, [file]);

  const handleFilePicker = () => {
    const filestackApikey = "FILESTACK_API_KEY";
    const filestack = client.init(filestackApikey, filePickerOptions);

    const picker = filestack.picker(filePickerOptions);
    picker.open();
  };

  return (
    <div className="App">
      <h2>File uploads with filestack</h2>
      <button onClick={() => handleFilePicker()}>Upload File</button>

      <hr />

      {file ? (
        <img
          style={{ maxWidth: "300px" }}
          src={file.filesUploaded[0]?.url}
          alt="Filestack"
        />
      ) : (
        "No file has been chosen yet."
      )}
    </div>
  );
}
