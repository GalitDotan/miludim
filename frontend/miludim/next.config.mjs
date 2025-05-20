/** @type {import('next').NextConfig} */

function rewrites_func() {
    return [
        {
            source: '/:any*',
            destination: '/',
        },
    ];
}


const nextConfig = {
    rewrites: rewrites_func,
};

export default nextConfig;
