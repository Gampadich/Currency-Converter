document.getElementById('convertBtn').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = 'Please enter a valid amount.';
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=b827ccb335574d858555412187264633`)
        .then(response => response.json())
        .then(data => {
            console.log('API response',data)

            if (data.result === undefined){
                document.getElementById('result').textContent = 'Conversion failed. Try other currencies.'
                return
            }
            function typeText(element, text, delay = 50) {
                element.textContent = '';
                let i = 0;
                const interval = setInterval(() => {
                    element.textContent += text[i];
                    i++;
                    if (i === text.length) {
                        clearInterval(interval);
                    }
                }, delay);
            }
            
            const converted = data.result; // БЕРЕМО ГОТОВИЙ результат!
            const resultText = `Result: ${converted.toFixed(2)} ${to}`
            const resultElement = document.getElementById('result')
            typeText(resultElement, resultText)
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('result').textContent = 'Error converting currencies.';
        });
});

document.getElementById('toggleTheme').addEventListener('click', function(){
    document.body.classList.toggle('dark')
})