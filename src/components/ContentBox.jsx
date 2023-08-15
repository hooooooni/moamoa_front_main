import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Content,
    ContentOuter,
    Content_Bottom,
    Content_Bottom_Header,
    Content_Slider,
    Content_Top,
    Content_Top_Map,
    Content_Top_Scrap,
    Content_Top_Scrap_Body,
    Content_Top_Scrap_Header,
} from "./Styled";
import { PiForkKnife } from "react-icons/pi";
import axios from "axios";
// import Location from './Layout/Location';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";

export default function ContentBox() {
    const [text, setText] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/store/get_near_store"
            );
            setText(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("err");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const Box = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
    const Slide = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border-radius: 8px;
  `;

    return (
        <>
            <ContentOuter>
                <Content>
                    <Content_Top>
                        <Content_Top_Map>{/* <Location></Location> */}</Content_Top_Map>
                        <Content_Top_Scrap>
                            <Content_Top_Scrap_Header>스크랩</Content_Top_Scrap_Header>
                            <Content_Top_Scrap_Body></Content_Top_Scrap_Body>
                        </Content_Top_Scrap>
                    </Content_Top>
                    <Content_Bottom>
                        <Content_Bottom_Header>
                            <PiForkKnife size={"30px"} />내 주변 맛집
                        </Content_Bottom_Header>
                        <Content_Slider>
                            <Box>
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation
                                    onSwiper={(swiper) => swiper}
                                    onSlideChange={() => console.log("slide change")}
                                >
                                    {text.map((lion, idx) => (
                                        <SwiperSlide>
                                            <button>스크랩</button>
                                            <Slide
                                                key={idx}
                                                onClick={() =>
                                                    navigate(`/App/${lion.name}`, {
                                                        state: {
                                                            storename: lion.name,
                                                            storeid: lion.store_id,
                                                        },
                                                    })
                                                }
                                            >
                                                {/* <button onClick={navigate("/App/LookforPage")}>
                          스크랩
                        </button> */}
                                                {lion.name}
                                                <br />
                                                {lion.type}
                                            </Slide>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Content_Slider>
                    </Content_Bottom>
                </Content>
            </ContentOuter>
        </>
    );
}
