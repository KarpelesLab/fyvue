declare function sitemapPlugin(options: {}): {
    name: string;
    closeBundle(): void;
    transformIndexHtml(): {
        tag: string;
        injectTo: "head" | "body" | "head-prepend" | "body-prepend" | undefined;
        attrs: {
            rel: string;
            type: string;
            title: string;
            href: string;
        };
    }[];
};
export default sitemapPlugin;