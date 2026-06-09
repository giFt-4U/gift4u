// CategorySection.jsx

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

const brands = [
    {
        name: "따숨베베",
        img: "/images/brand/dasum_bebe.png",
    },
    {
        name: "맘스온",
        img: "/images/brand/momson.png",
    },
    {
        name: "베베클린",
        img: "/images/brand/bebe_clean.png",
    },
    {
        name: "포근아이",
        img: "/images/brand/pogeun_i.png",
    },
    {
        name: "리틀솜",
        img: "/images/brand/little_som.png",
    },
    {
        name: "토닥토이",
        img: "/images/brand/todak_toy.png",
    },
    {
        name: "베이비온",
        img: "/images/brand/babyon.png",
    },
    {
        name: "라라베베",
        img: "/images/brand/lala_bebe.png",
    },
    {
        name: "클린맘",
        img: "/images/brand/clean_mom.png",
    },
    {
        name: "순한아이",
        img: "/images/brand/soon_i.png",
    },
    {
        name: "맑은숨",
        img: "/images/brand/malgeun_sum.png",
    },
    {
        name: "케어온",
        img: "/images/brand/care_on.png",
    },
];

const CategorySection = ({ onSelectCategory, onSelectBrand }) => {
    const [selected, setSelected] = useState(0);
    const [showBrands, setShowBrands] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");

    const handleClick = (cat) => {
        setSelected(cat.id);

        // 브랜드는 categoryId=1로 조회하지 않고,
        // 브랜드 목록 UI만 열고 닫음
        if (cat.id === 1) {
            setShowBrands((prev) => !prev);
            return;
        }

        setShowBrands(false);
        setSelectedBrand("");
        onSelectCategory(cat.id);
    };

    const handleBrandClick = (brandName) => {
        setSelected(1);
        setSelectedBrand(brandName);

        // 상품페이지로 이동하지 않고,
        // Home.jsx에서 바로 브랜드 상품을 조회하도록 전달
        onSelectBrand(brandName);
    };

    return (
        <div
            style={{
                padding: "20px 0 40px 0",
                minHeight: showBrands ? "300px" : "220px",
            }}
        >
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
                            opacity: selected === cat.id ? 1 : 0.75,
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
                                marginTop: "5px",
                                fontWeight: selected === cat.id ? 700 : 600,
                                color: selected === cat.id ? "#111" : "#333",
                            }}
                        >
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>

            {showBrands && (
                <div
                    style={{
                        marginTop: "20px",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        paddingBottom: "6px",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            gap: "14px",
                            padding: "0 2px",
                        }}
                    >
                        {brands.map((brand) => {
                            const isSelectedBrand = selectedBrand === brand.name;

                            return (
                                <button
                                    key={brand.name}
                                    type="button"
                                    onClick={() => handleBrandClick(brand.name)}
                                    style={{
                                        width: "72px",
                                        border: "none",
                                        background: "transparent",
                                        padding: 0,
                                        cursor: "pointer",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            margin: "0 auto",
                                            borderRadius: "50%",
                                            backgroundColor: "#f7f7f7",
                                            border: isSelectedBrand
                                                ? "2px solid #f5c542"
                                                : "1px solid #eee",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={brand.img}
                                            alt={brand.name}
                                            onError={(e) => {
                                                e.target.src = "/images/brand/default_brand.png";
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>

                                    <p
                                        style={{
                                            margin: "6px 0 0",
                                            fontSize: "11px",
                                            fontWeight: isSelectedBrand ? 700 : 500,
                                            color: isSelectedBrand ? "#111" : "#333",
                                            lineHeight: "14px",
                                        }}
                                    >
                                        {brand.name}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorySection;