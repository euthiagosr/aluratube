import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu"; 
import Favorites from "../src/components/Favorites"; 
import { videoService } from "../src/Services/videoService";

const StyledBanner = styled.div`
display: flex;
  width: 100%;
  height: 230px;
  background-image: url(${({bgImage}) => bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledHeader = styled.div`
background-color: ${ ({theme}) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

//Method to add to config.json videos to the list videos from the database
function preparePlaylistRecords(newPlayslist){
  
  const records = Object.keys(config.playlists);

  records.map((playlist) => {
    config.playlists[playlist].map((video) => {
      const videoToAdd = {playlist: playlist, title: "", url: "", thumb: ""};

      videoToAdd.title = video.title;
      videoToAdd.url = video.url;
      videoToAdd.thumb = video.thumb;

      if(!newPlayslist[videoToAdd.playlist]){
        newPlayslist[videoToAdd.playlist] = [];
      }
      newPlayslist[videoToAdd.playlist].push(videoToAdd);
    })
  })

  return newPlayslist;
}

function HomePage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});
  const service = videoService();

  React.useEffect(() => {
                service.getAllVideos()
                  .then((dados) => {
                    var newPlayslist = {};
                    dados.data.forEach((video) => {
                        if(!newPlayslist[video.playlist]){
                            newPlayslist[video.playlist] = [];
                        }
                        newPlayslist[video.playlist].push(video);
                    })
                    preparePlaylistRecords(newPlayslist);
                    setPlaylists(newPlayslist);
                });
  },[]);

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1
      }}>
        <Menu filterValue={filterValue} setFilterValue={setFilterValue}/>
        <Header />
        <Timeline playlists={playlists} videoFilterValue={filterValue} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;


function Header() {
  return (
    <StyledHeader>
      <StyledBanner bgImage={config.banner} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ videoFilterValue,  ...props }) {
  console.log('TSR === videosLst: ' , props.playlists);
  const playlists = Object.keys(props.playlists);
  return (
      <StyledTimeline>
        {playlists.map((playlistName) => {
          const videosLst = props.playlists[playlistName];
          
          return (
            <section key={playlistName}>
              <h2 style={{ textTransform: "capitalize" }}>{playlistName}</h2>
              <div>
                {videosLst.filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = videoFilterValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                }).map((video) => {
                  return (
                      <a href={video.url} key={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
  );
}
