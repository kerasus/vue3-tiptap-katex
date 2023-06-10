module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://3a.alaatv.com',
        changeOrigin: true
      }
    }
  }
}
