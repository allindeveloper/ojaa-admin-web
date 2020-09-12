import React from "react";
import Dropzone from "react-dropzone";
import "./style.css";
// for profile picture
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thumbsContainer = {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
    };
    const thumbs = this.props.files.map((file) => (
      <img
        src={file.preview}
        tyle={thumbsContainer}
        alt="profile"
        key={file.size}
      />
    ));
    const render =
    Object.keys(this.props.files).length !== 0 ? (
      this.props.files.map(file => <aside>{thumbs}</aside>)
    ) : (
      <p className="hello">+ image here to prompt users to click</p>
    );
    return (
      <div className="App">
        <Dropzone
          onDrop={this.props.handleDrop}
          multiple={false}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            border: " 1px dashed",
          }}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop Image, or click to add Image</p>
                {thumbs}
              </div>
            </>
          )}
        </Dropzone>
        {/* <div>
        <strong>Files:</strong>
        <ul>
          {this.props.files.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div> */}
      </div>
    );
  }
}

export default ImageUpload;
