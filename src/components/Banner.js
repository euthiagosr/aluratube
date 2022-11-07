import config from "../../config.json";
import styled from "styled-components";

const BannerStyle = styled.div`
  display: flex;
  width: 100%;
  top: 56px;
  height: 230px;
  overflow: hidden;
`;

export default function Banner() {
  return (
    <BannerStyle>
      <div>
        <img src={config.banner} />
      </div>
    </BannerStyle>
  );
}
