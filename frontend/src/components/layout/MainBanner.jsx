//MainBanner.jsx

import React, { useEffect, useState } from "react";

const images = [
    "/assets/banner/banner1.jpg",
    "/assets/banner/banner2.jpg",
    "/assets/banner/banner3.jpg",
    "/assets/banner/banner4.jpg",
];

const MainBanner = () => {
    const [index, setIndex] = useState(0);

    // 자동 슬라이드
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (i) => {
        setIndex(i);
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "200px" }}>

            {/* 이미지 */}
            <img
                src={images[index]}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                }}
            />

            {/* 이전 버튼 */}
            <button
                onClick={prev}
                style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                }}
            >
                ◀
            </button>

            {/* 다음 버튼 */}
            <button
                onClick={next}
                style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                }}
            >
                ▶
            </button>

            {/* 🔥 DOT INDICATORS */}
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                }}
            >
                {images.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => goToSlide(i)}
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            backgroundColor: i === index ? "#000" : "#ccc",
                            transition: "0.3s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainBanner;