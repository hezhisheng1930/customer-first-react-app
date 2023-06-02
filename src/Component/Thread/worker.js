const workerCode = () => {
	onmessage = (e) => {
		console.debug(e, '我是子线程')
		postMessage('我是子线程传递的数据')
	}

	setTimeout(() => {
		postMessage('我是子线程传递过来的数据')
	}, 3000)

}


let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'))
const blob = new Blob([code], { type: "application/javascript" });
const url = URL.createObjectURL(blob);

export default url;