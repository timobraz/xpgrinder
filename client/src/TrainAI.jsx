import axios from "axios";
import { useState, useContext } from "react";
import { UserSettingsContext } from "./UserSettingsContext";
import "./TrainAI.css";
import TextButton from "./TextButton";
const TrainAI = () => {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const { setLoading, setError } = useContext(UserSettingsContext);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [show, setShow] = useState(true);

  const submitExample = async () => {
    setLoading(true);

    const data = await axios
      .post("/api/example", {
        completion,
        prompt,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        setError({ ...err.response.data });
        setUploadStatus("Failed");
      });
    if (data) {
      console.log(data);
      setUploadStatus("Success in uploading, Thank you!");
    }
    setLoading(false);
  };
  return (
    <div className="trainAI">
      <h1 style={{ color: show ? "gold" : "gray", marginBottom: "1rem", cursor: "pointer" }} onClick={() => setShow((prevState) => !prevState)}>
        Help Train AI {!show && "(Hidden)"}
      </h1>
      {show && (
        <div className="trainAIBody">
          <div className="sampleAI">
            <p className="sampleText">
              To help use improve our AI, you can provide examples which it will be trained upon. Below is a sample example
            </p>
            <p className="sampleText green">10 Responses = 1 USD</p>

            <div className="sampleExample">
              <h2 className="samplePrompt">Message: another day grinding for whitelist</h2>
              <h2 className="sampleResponse">Response: Keep working you got this</h2>
            </div>
          </div>
          <div className="filterTotal">
            <h1 className="uploadStatus">
              Upload Status: <span className="uploadMessage">{uploadStatus}</span>
            </h1>
            <div className="filterElement">
              <label className="flWord">Message</label>
              <input onChange={(e) => setPrompt(e.target.value)} type="text" required className="flText" value={prompt} />
              <span className="flWord">Response</span>
              <input onChange={(e) => setCompletion(e.target.value)} type="text" required className="flText" value={completion} />
            </div>
          </div>
          <div className="filtersButtons">
            <div className="buttonWrapper" onClick={() => submitExample()}>
              <TextButton bgc="rgb(23, 149, 118)" pd="2rem" fz="2rem">
                Submit Example
              </TextButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainAI;
