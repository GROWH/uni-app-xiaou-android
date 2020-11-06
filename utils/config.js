let baseUrl=null
if(process.env.NODE_ENV === 'development'){
	// 开发环境
    baseUrl="http://localhost:3000"
    // baseUrl="https://localhost"
}else{
	// 生产环境
    baseUrl="https://api.zhaowei.shop"
}
export default baseUrl