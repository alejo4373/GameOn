var sports = [{sport_id: 1, proficiency: 1}, {sport_id: 2, proficiency: 2}]
var user_id = 1;
var SQLStatement = 'INSERT INTO sports_proficiency (user_id, sport_id, proficiency)'

sports.forEach((sport, index) => {
  console.log(sport)
  if(index === 0) {
    SQLStatement  =  SQLStatement + '\n' + `VALUES(${user_id}, ${sport.sport_id}, ${sport.proficiency})` 
  } else {
    SQLStatement = SQLStatement + '\n' + `,(${user_id}, ${sport.sport_id}, ${sport.proficiency})`
  }
})
  SQLStatement += ';'

console.log(SQLStatement)