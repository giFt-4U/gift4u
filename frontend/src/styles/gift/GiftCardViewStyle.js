import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 90vh;
    background: #fff;
    position: relative;
`;

export const CardArea = styled.div`
    flex: 1;
    background-image: ${({ $bgImg }) => `url(${$bgImg})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 24px;
    overflow-y: auto;
    box-sizing: border-box;
`;

export const MainImageFrame = styled.div`
    width: 100%;
    aspect-ratio: 1.3 / 1;
    background: #fff;
    border: 1px solid #ccc;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 8px;
`;

export const ImagePlaceholderLine = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    &::before, &::after {
        content: "";
        position: absolute;
        width: 141.4%;
        height: 1px;
        background: #ddd;
        top: 0;
    }
    &::before { left: 0; transform: rotate(37.5deg); transform-origin: top left; }
    &::after { right: 0; transform: rotate(-37.5deg); transform-origin: top right; }
`;

export const ProductContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 14px 0;
`;

export const ProductBox = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.9);
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const SmallThumbBox = styled.div`
    width: 52px;
    height: 52px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
`;

export const ProductTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
`;

export const ProductName = styled.h2`
    font-size: 14px;
    font-weight: 600;
    color: #222;
    margin: 0;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const RealProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center; 
    display: block;
`;

export const MessageBox = styled.div`
    width: 100%;
    margin-top: 6px;
    box-sizing: border-box;
    padding: 5px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const MessageText = styled.p`
    font-size: 15px;
    color: #333;
    line-height: 1.8;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    font-weight: 500;
    text-align: center;
`;

export const ButtonArea = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 16px 20px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
`;

export const ActionButton = styled.button`
    width: 100%;
    padding: 16px;
    background: ${({ $accent }) => $accent ?? '#FF8C00'};
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const DisabledButton = styled.button`
    width: 100%;
    padding: 16px;
    background: #ccc;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: not-allowed;
`;

export const CenterText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #aaa;
    font-size: 14px;
`;
