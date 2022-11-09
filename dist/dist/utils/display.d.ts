declare const cropText: (str: string, ml?: number, end?: string) => string;
declare const tailwindColors: {
    "fv-primary": {
        "50": string;
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
        "800": string;
        "900": string;
    };
    "fv-neutral": {
        "50": string;
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
        "800": string;
        "900": string;
    };
};
declare const formatBytes: (bytes: number, decimals?: number) => string;
export { cropText, formatBytes, tailwindColors };
