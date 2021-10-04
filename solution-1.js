const fs = require('fs')
const csv = require('csvtojson')
const {Parser} = require('json2csv')

;(async ()=>{
	const jsonData = await csv().fromFile('./input/question-1/main.csv')

	const temp = {}

	jsonData.forEach(data=>{
		let decade = Math.floor(data.Year/10)*10
		if(temp[decade]){
			temp[decade] = {
				Decade:decade,
				Population:Number(data.Population),
				Violent:Number(data.Violent)+Number(temp[decade].Violent),
				Property:Number(data.Property)+Number(temp[decade].Property),
				Murder:Number(data.Murder)+Number(temp[decade].Murder),
				Forcible_Rape:Number(data.Forcible_Rape)+Number(temp[decade].Forcible_Rape),
				Robbery:Number(data.Robbery)+Number(temp[decade].Robbery),
				Aggravated_assault:Number(data.Aggravated_assault)+Number(temp[decade].Aggravated_assault),
				Burglary:Number(data.Burglary)+Number(temp[decade].Burglary),
				Larceny_Theft:Number(data.Larceny_Theft)+Number(temp[decade].Larceny_Theft),
				Vehicle_Theft:Number(data.Vehicle_Theft)+Number(temp[decade].Vehicle_Theft)
			}
		}else{
			temp[decade] = {
				Decade:decade,
				Population:data.Population,
				Violent:data.Violent,
				Property:data.Property,
				Murder:data.Murder,
				Forcible_Rape:data.Forcible_Rape,
				Robbery:data.Robbery,
				Aggravated_assault:data.Aggravated_assault,
				Burglary:data.Burglary,
				Larceny_Theft:data.Larceny_Theft,
				Vehicle_Theft:data.Vehicle_Theft
			}
		}
	})

	const result = []
	for(key in temp){
		result.push(temp[key])
	}

	console.log('Result : ',result)

	const csvUpdated = new Parser({fields:['Decade','Population','Violent','Property','Murder','Forcible_Rape','Robbery','Aggravated_assault','Burglary','Larceny_Theft','Vehicle_Theft']}).parse(result)

	fs.writeFileSync('./output/answer-1/main.csv',csvUpdated)

	console.log('Done!')

})()


