import styled from "styled-components";

const FavoritesStyle = styled.div`
  width: 100%;
  height: 200px;
  margin-left: 20px;
  .fav-title{
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    font-family: 'Helvetica';
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  .fav-channels{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 400px;
    .fav-thumb {
      width: 100px;
      height: 100px;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

export default function Favorites(fav) {
  const favLst = Object.keys(fav.favorites);
  return (
    <FavoritesStyle>
      <div className="fav-title">
      <h2>AluraTube Favoritos</h2>
      </div>
      <div className="fav-channels">
      {favLst.map((favoriteName) => {
        const favorite = fav.favorites[favoriteName];
        return (
          <div className="fav-thumb" key={favoriteName}>
            <a href={favorite.url}>
              <img src={favorite.image} />
              <p>{favorite.name}</p>
            </a>
          </div>
        );
      })}
      </div>
    </FavoritesStyle>
  );
  
}
