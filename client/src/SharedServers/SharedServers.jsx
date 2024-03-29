import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TextButton from "../TextButton";
import { UserSettingsContext } from "../UserSettingsContext";
import SharedServer from "./SharedServer";
import "./SharedServers.css";
const SharedServers = () => {
  const [show, setShow] = useState(true);
  const { shared, setShared } = useContext(UserSettingsContext);
  async function getServers() {
    const servers = await axios
      .get("/api/share")
      .then((resp) => {
        setShared(resp.data);
      })
      .catch(() => {
        setShared([]);
      });
  }
  useEffect(() => {
    getServers();
  }, []);
  return (
    <div className="sharedServersTotal">
      <h1 style={{ color: show ? "white" : "gray", marginBottom: "1rem", cursor: "pointer" }} onClick={() => setShow((prevState) => !prevState)}>
        Shared Servers {!show && "(Hidden)"}
      </h1>
      {show && shared.length > 0 ? (
        shared.map((server) => {
          return (
            <SharedServer
              key={server.uuid}
              guildname={server.guildname}
              imghash={server.imghash}
              guildid={server.guildid}
              userid={server.userid}
              userhash={server.userhash}
              username={server.username}
              uuid={server.uuid}
              getServers={getServers}
            />
          );
        })
      ) : show ? (
        <h3 className="noShared">No shared servers currently, be the first one!</h3>
      ) : (
        ""
      )}
      {show && (
        <div className="filtersButtons">
          <div className="buttonWrapper" onClick={getServers}>
            <TextButton bgc="green">Refresh Shared Servers</TextButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedServers;
