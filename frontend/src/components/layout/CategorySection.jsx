//CategorySection.jsx

import React from "react";

const categories = [
    { name: "전체", img: "/images/category/baby_all.png" },
    { name: "브랜드", img: "/images/category/brand.png" },
    { name: "위생", img: "/images/category/hygiene.png" },
    { name: "수유", img: "/images/category/feeding.png" },
    { name: "라이프", img: "/images/category/life.png" },
    { name: "세탁/세척", img: "/images/category/laundry.png" },
    { name: "맘케어", img: "/images/category/momcare.png" },
    { name: "베이비케어", img: "/images/category/babycare.png" },
];

const CategorySection = () => {
    return (
        <div style={{ padding: "20px 0 40px 0" }}>

            {/* 카테고리 그리드 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px",
                    textAlign: "center",
                }}
            >
                {categories.map((cat) => (
                    <div key={cat.name} style={{ cursor: "pointer" }}>
                        <img
                            src={cat.img}
                            alt={cat.name}
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                            }}
                        />
                        <p style={{ fontSize: "12px", marginTop: "5px" }}>
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;