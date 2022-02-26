module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://3a.alaatv.com',
                changeOrigin: true
            },
        }
    }
}