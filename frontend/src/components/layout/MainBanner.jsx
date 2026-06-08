// MainBanner.jsx

import React, { useEffect, useState } from "react";

const images = [
    "/assets/banner/banner1.jpg",
    "/assets/banner/banner2.jpg",
    "/assets/banner/banner3.jpg",
    "/assets/banner/banner4.jpg",
];

const MainBanner = () => {
    const [index, setIndex] = useState(0);

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

    const arrowButtonStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 3,

        width: "42px",
        height: "42px",

        border: "none",
        borderRadius: "50%",

        backgroundColor: "rgba(0, 0, 0, 0.38)",
        color: "#ffffff",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "34px",
        fontWeight: 300,
        lineHeight: "42px",

        cursor: "pointer",
        padding: 0,

        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "20px",
            }}
        >
            <img
                src={images[index]}
                alt={`메인 배너 ${index + 1}`}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                }}
            />

            {/* 왼쪽 어두운 그라데이션 */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "70px",
                    height: "100%",
                    background:
                        "linear-gradient(to right, rgba(0,0,0,0.22), transparent)",
                    pointerEvents: "none",
                }}
            />

            {/* 오른쪽 어두운 그라데이션 */}
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: "70px",
                    height: "100%",
                    background:
                        "linear-gradient(to left, rgba(0,0,0,0.22), transparent)",
                    pointerEvents: "none",
                }}
            />

            <button
                type="button"
                onClick={prev}
                aria-label="이전 배너"
                style={{
                    ...arrowButtonStyle,
                    left: "12px",
                }}
            >
                ‹
            </button>

            <button
                type="button"
                onClick={next}
                aria-label="다음 배너"
                style={{
                    ...arrowButtonStyle,
                    right: "12px",
                }}
            >
                ›
            </button>

            <div
                style={{
                    position: "absolute",
                    bottom: "12px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    zIndex: 4,
                }}
            >
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => goToSlide(i)}
                        aria-label={`${i + 1}번째 배너로 이동`}
                        style={{
                            width: i === index ? "20px" : "8px",
                            height: "8px",
                            border: "none",
                            borderRadius: "999px",
                            padding: 0,
                            cursor: "pointer",
                            backgroundColor:
                                i === index
                                    ? "#ffffff"
                                    : "rgba(255, 255, 255, 0.55)",
                            transition: "0.3s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainBanner;