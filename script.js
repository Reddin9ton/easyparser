let dataOne;
let dataTwo;
let itogArray = [];

document.getElementById('fileInput1').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    delimiter: ";",
    complete: function(results) {
      console.log('Данные из первого CSV файла:', results.data);
      dataOne = results.data;
      processHandler();
    }
  });
});

document.getElementById('fileInput2').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    delimiter: ";",
    complete: function(results) {
      console.log('Данные из второго CSV файла:', results.data);
      dataTwo = results.data;
      processHandler();
    }
  });
});

function processHandler() {
  if (dataOne && dataTwo) {
    let result = Math.max(dataOne.length, dataTwo.length);

    for (let i = 0; i < result; i++) {
      if (dataOne[i] && dataTwo[i] && dataOne[i][0] === dataTwo[i][0]) {
        let tempArray = [...dataOne[i]];
        if (dataTwo[i][2] == '') {
          tempArray.splice(2, 0, 'false');
        } else {
          tempArray.splice(2, 0, dataTwo[i][2]);
        }
        itogArray.push(tempArray);
      }
    }
  }
  return itogArray;
}

function convertArrayToCSV(arr) {
  let csvContent = Papa.unparse(arr, {
    delimiter: ";"
  });
  return csvContent;
}

let csvData = convertArrayToCSV(itogArray);

function downloadCSV(data, filename) {
  let csvContent = Papa.unparse(data, {
    delimiter: ";"
  });
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Создаем ссылку для скачивания файла
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);

    // Добавляем ссылку на страницу и эмулируем клик для скачивания файла
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

