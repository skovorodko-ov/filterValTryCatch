const filterByType = (type, ...values) => values.filter(value => typeof value === type), // объявляем переменную filterByType, которой присваимваем функцию, котора  в свою очередь принимает первый аргумент, и с помощью rest оператора собирает остальные аргументы в массив. Функция возвращает отфильтрованный массив из элементов удволетворяющих условию в теле функции

	hideAllResponseBlocks = () => { // объявление функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // объявляем переменную responseBlocksArray, в которую присваиваем массив с помощью метода Array.from (создает массив из массиво подобных элементов, которые в свою очередь получаем со страницы в коллекцию - все дивы с классом dialog__response-block) 
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебераем массив responseBlocksArray и каждому элементу массива присваиваем стиль display: none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // объявляем фугкцию showResponseBlock, которая принимает три аргумента
		hideAllResponseBlocks();								// запускаем фугкцию hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; // ищем в document элемент по переданному аргументу blockSelector и присваиваем этому элементу стиль display: block
		if (spanSelector) { // если аргумент spanSelector существует, то выполняем слудующие
			document.querySelector(spanSelector).textContent = msgText; // ищем в document елемент по переданному аргументу spanSelector и заполняем его текстовое содержимое содердимым переданного аргумента msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),	// функция, которая возващает фунцию showResponseBlock с переданным ей аргументом, в том числе аргументом, который она сама получила

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),	// функция, которая возващает фунцию showResponseBlock с переданным ей аргументом, в том числе аргументом, который она сама получила

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // функция, которая возващает фунцию showResponseBlock с переданным ей аргументом

	tryFilterByType = (type, values) => {				// функция, которая принимает два аргумента
		try {																			// конструкция позволяющая перехватить ошибку в коде ограниченном {} и продолжить выполнение остального скрипта
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // создание константы valuesArray, метод eval выполняет код представленный строкой, а именно запускает функцию filterByType с передачей ей аргументов. Возвращенный массив join объеденяет в строку (элементы через запятую и пробел)
			const alertMsg = (valuesArray.length) ?				// объявляется константа alertMsg и присваивается ей значение при помощи тернарного оператора
				`Данные с типом ${type}: ${valuesArray}` : // если valuesArray имеет длинну отличную от нуля (true), то alertMsg присваивается строка: `Данные с типом ${type}: ${valuesArray}`
				`Отсутствуют данные типа ${type}`; // если длина valuesArray равна нулю (false), то alertMsg присваивается строка: `Отсутствуют данные типа ${type}`
			showResults(alertMsg);						// запускаем функцию showResults и передаем ей аргумент
		} catch (e) {														// если в блоке try произошла ошибка выполняется код заключенный в далее идущих {}
			showError(`Ошибка: ${e}`);						// запускаем функцию showError с передачей ей аргумента
		}
	};

const filterButton = document.querySelector('#filter-btn');	// получаем кнопку с id="filter-btn"

filterButton.addEventListener('click', e => {					// прослушиватель события клик на кнопке filterButton
	const typeInput = document.querySelector('#type');	// получаем input с id="type"
	const dataInput = document.querySelector('#data');	// получаем input с id="data"

	if (dataInput.value === '') {												// условие для пустого value в dataInput
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // создаем сообщение для dataInput если он пустой
		showNoResults();																	// если инпут пустой запускаем функцию showNoResults
	} else {																						// в противном случае
		dataInput.setCustomValidity('');									// удаляем сообщение, очищаем его содерживмое
		e.preventDefault();																// перехватываем поведение браузера по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());	// запускаем функцию tryFilterByType и передаем в нее аргументы (содержимое инпутов с удалением пробелов в начале и конце)
	}
});

