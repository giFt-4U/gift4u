import React, { useState } from "react";

const categories = [
    { id: 0, name: "전체", img: "/images/category/baby_all.png" },
    { id: 1, name: "브랜드", img: "/images/category/brand.png" },
    { id: 2, name: "위생", img: "/images/category/hygiene.png" },
    { id: 3, name: "수유", img: "/images/category/feeding.png" },
    { id: 4, name: "라이프", img: "/images/category/life.png" },
    { id: 5, name: "세탁/세척", img: "/images/category/laundry.png" },
    { id: 6, name: "맘케어", img: "/images/category/momcare.png" },
    { id: 7, name: "베이비케어", img: "/images/category/babycare.png" },
];

const CategorySection = ({ onSelectCategory }) => {

    const [selected, setSelected] = useState(0);

    const handleClick = (cat) => {

        setSelected(cat.id);

        // 부모(HomePage)로 전달
        onSelectCategory(cat.id);
    };

    return (
        <div style={{ padding: "20px 0 40px 0" }}>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px",
                    textAlign: "center",
                }}
            >
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => handleClick(cat)}
                        style={{
                            cursor: "pointer",
                            opacity: selected === cat.id ? 1 : 0.5
                        }}
                    >
                        <img
                            src={cat.img}
                            alt={cat.name}
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                            }}
                        />

                        <p
                            style={{
                                fontSize: "12px",
                                marginTop: "5px"
                            }}
                        >
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;