declare const productionConfig: {
    build: {
        lib: {
            entry: string;
            name: string;
            fileName: string;
        };
        rollupOptions: {
            external: string[];
            plugins: Plugin[];
            output: {
                globals: {
                    react: string;
                    'react-dom': string;
                    '@forminator/react-wire': string;
                };
            };
        };
    };
};
export default productionConfig;
