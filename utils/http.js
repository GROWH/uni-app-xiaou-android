
import baseurl from '@/utils/config.js'
const http=(option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseurl+option.url,
			method:option.method || 'GET',
			data:option.data || {},
			header:option.header || {
				'content-type': "application/x-www-form-urlencoded"
			},
			success:resolve,
			fail:reject
		})
	})
	
}
export {
	http
	}