import config from "../../config.json";
import styled from "styled-components";

const BannerStyle = styled.div`
display: flex;
  width: 100%;
  height: 230px;
  overflow: hidden;
  img{
    width: 100%;
  }
`;

export default function Banner() {
  return (
    <BannerStyle>
        <img src={config.banner} />
    </BannerStyle>
  );
}
