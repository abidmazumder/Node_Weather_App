const address = document.getElementById('input');
const output1 = document.getElementById('output-1');
const output2 = document.getElementById('output-2');
const forecast = () => {
  if (address.value == '') {
    return (output1.innerHTML = 'You must provide an address!');
  } else {
    output1.textContent = 'Loading....';
    output2.textContent = '';
    fetch(`/weather?address=${address.value}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          output1.innerHTML = data.error;
        } else {
          //  const area = `${data.location} , ${}`;
          address.value = '';
          output1.innerHTML = `${data.location}`;
          output2.innerHTML = `${data.forcastData}`;
        }
      });
    });
  }
};
