const fs = require('fs')
const csv = require('csvtojson')
const {Parser} = require('json2csv')

;(async ()=>{
	const jsonData = await csv().fromFile('./input/question-2/main.csv')

	const occupation = {} 

	jsonData.forEach(data=>{
		if(occupation[data.occupation]){
			let min = occupation[data.occupation].min
			let max = occupation[data.occupation].max
			if(min>data.age){
				occupation[data.occupation].min = data.age
			}
			if(max<data.age){
				occupation[data.occupation].max = data.age
			}
		}else{
			occupation[data.occupation] = { min: data.age, max: data.age }
		}
	})

	const result = []

	for(key in occupation){
		result.push({
			occupation: key,
			min: occupation[key].min,
			max: occupation[key].max
		})
	}

	result.sort((a,b)=>{
		if(a.occupation<b.occupation)
			return -1
		return 1
	})

	console.log('Result : ',result)

	const csvUpdated = new Parser({fields:['occupation','min','max']}).parse(result)

	fs.writeFileSync('./output/answer-2/main.csv',csvUpdated)

	console.log('Done!')

})()


