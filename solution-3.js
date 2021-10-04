const fs = require('fs')
const csv = require('csvtojson')
const {Parser} = require('json2csv')

;(async ()=>{
	const jsonData = await csv().fromFile('./input/question-3/main.csv')

	const temp = {} 
	let counter = 0
	jsonData.forEach(data=>{
		if(temp[data.Team]){
			temp[data.Team] = {
				id:temp[data.Team].id,
				Team: data.Team,
				'Yellow Cards': Number(data['Yellow Cards'])+Number(temp[data.Team]['Yellow Cards']),
				'Red Cards': Number(data['Red Cards'])+Number(temp[data.Team]['Red Cards'])
			}
		}else{
			temp[data.Team] = {
				id:counter,
				Team: data.Team,
				'Yellow Cards': data['Yellow Cards'],
				'Red Cards': data['Red Cards']
			}
			counter++
		}
	})

	const result = []
	for(key in temp){
		result.push(temp[key])
	}
	result.sort((a,b)=>{
		let a_y_c = Number(a['Yellow Cards'])
		let a_r_c = Number(a['Red Cards'])
		let b_y_c = Number(b['Yellow Cards'])
		let b_r_c = Number(b['Red Cards'])
		if(a_r_c>b_r_c){
			return -1
		}else if(a_r_c==b_r_c && a_y_c>b_y_c){
			return -1
		}
		return 1
	})

	console.log('Result : ',result)

	const csvUpdated = new Parser({fields:['id','Team','Yellow Cards','Red Cards']}).parse(result)

	fs.writeFileSync('./output/answer-3/main.csv',csvUpdated)

	console.log('Done!')

})()


