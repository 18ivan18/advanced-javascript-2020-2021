const fs = require('fs');


console.log("Reading...")
fs.readFile('./students.txt', { encoding: 'utf8' }, function (err, content) {
  if (err) { console.error(err); return; }

  const people = content.split('\r\n').filter(line => line.indexOf('#') != 0)
  .map(line => line.split(" ")).map(arr => {
      const obj = {};
      obj.fn = arr[arr.length - 1];
      obj.name = arr.slice(0, arr.length - 1).reduce((acc, curr) => acc + " " + curr, "").trim();
      return obj;
  });

  fs.readFile('./marks.txt', { encoding: 'utf8' }, function (err, marks) {
      if (err) { console.error(err); return; }

      const mark = marks.split('\r\n').filter(line => line.indexOf('#') != 0)
      .map(line => line.split(" ")).map(arr => {
        const obj = {};
        obj.fn = arr[0];
        obj.scores = arr.slice(1, arr.length);
        return obj;
    });;

      fs.readFile('./credits.txt', { encoding: 'utf8' }, function (err, credits) {
        if (err) { console.error(err); return; }
        const credit = credits.split('\r\n').filter(line => line.indexOf('#') != 0)
        .map(line => line.split(" "));

        // (score = (receives/6) * credits )
        people.forEach(person => {
            const markForPerson = mark.filter(el => el.fn === person.fn)[0];
            for (let index = 0; index < credit[0].length; index++) {
                person[credit[0][index]] = ((markForPerson.scores[index] / 6) * credit[1][index]).toFixed(2);
            }
            delete person.fn;
        })

        let res = JSON.stringify(people, null, '\t');
        // let res = "";
        // people.forEach(curr => {
        //     res += '{';
        //     Object.keys(curr).forEach(function(key, index, arr) {
        //         // console.log(key, curr[key]);
        //         res = res + "\"" + key + "\":\"" + curr[key] + "\"";
        //         if (arr.length - 1 != index) {
        //             res+= ',';
        //         }
        //       });
        //     res += "}\n";
        // })

        console.log(res);

        fs.writeFile("./OutputFile.txt", res, { encoding: 'utf-8' }, function (err, writeResult) {
                  if (err) { console.error('error writing result: ', err); return; }
                //   console.log(writeResult);
        });
        

        console.log(people); 
      })
    })
});