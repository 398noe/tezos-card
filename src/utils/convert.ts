export const str2byte = (s: string): Uint8Array => {
    return (new TextEncoder().encode(s));
}

export const byte2str = (u: Uint8Array): string => {
    return (new TextDecoder().decode(Uint8Array.from(u)));
}

export const encodeStr = (s: string): string => {
    return "0x" + Array.from(str2byte(s)).map(v => v.toString(16)).join("");
}

export const decodeStr = (s: string): string => {
    if(s.length < 2) {
        s += "0x";
    }
    // 最初の0xのみ取り除く
    const n0s = s.slice(2);

    const hexNumArray = Array.from({ length: Math.ceil(n0s.length / 2) }, (v, i) => parseInt(n0s.substring(i * 2, (i + 1) * 2), 16));
    return byte2str(new Uint8Array(hexNumArray));
}

export const num2color = (n: number): string => {
    // bit列に変換
    const bit = Number(n).toString(2).padStart(24, "0")
    // rgbに切り出し, 16進数に変換, 更に文字列に変換し, 2文字づつにする
    const r = parseInt(bit.substring(0, 8), 2).toString(16).padStart(2, "0");
    const g = parseInt(bit.substring(8,16), 2).toString(16).padStart(2, "0");
    const b = parseInt(bit.substring(16,24), 2).toString(16).padStart(2, "0");

    return ("#" + r + g + b).toUpperCase()
}

export const color2num = (s: string): number => {
    // 先頭の#だけ取り除いて16進数変換
    const colorNum = parseInt(s.slice(1),16);
    
    if (isNaN(colorNum)) {
        return 0;
    }
    return colorNum;
}