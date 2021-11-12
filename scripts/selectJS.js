// Initialise Library
window.selectJS = (function() {

	// Create Configuration
	const config = {
		"fields": {
			"value": "id",
			"text": "text"
		}
	};

	// Create Proxy
	const proxy = {
		"setFields": (value, text) => {
			config.fields.value = value;
			config.fields.text = text;
			return Proxy;
		}
	};

	// Ready Logic
	document.addEventListener("DOMContentLoaded", (event) => {
		const elementList = [...document.getElementsByClassName("selectJS")];
		elementList.forEach((element) => {
			element.append(new Option(element.dataset.hasOwnProperty("placeholder")
				? element.dataset["placeholder"]
				: "Select...",
			"-1", true, true));
			if(!element.dataset.hasOwnProperty("url")) {
				console.log(element.id + " has no data-url attribute");
				return;
			}
			element.addEventListener("focus", (event) => {
				const fieldText = element.dataset.hasOwnProperty("fieldtext")
					? element.dataset["fieldtext"]
					: config.fields.text
				;
				const fieldValue = element.dataset.hasOwnProperty("fieldvalue")
					? element.dataset["fieldvalue"]
					: config.fields.value
				;
				const request = new XMLHttpRequest();
				request.open("GET", element.dataset["url"]);
				request.onload = () => {
					const data = JSON.parse(request.response);
					// NOTE: throw if data not an array?
					data.forEach((option) => {
						if(!option.hasOwnProperty(fieldValue) || !option.hasOwnProperty(fieldText)) {
							return;
							// NOTE: throw?
						}
						element.append(new Option(option[fieldText], option[fieldValue]));
					});
				}
				request.onerror = () => console.log("onerror");
				request.send();
			});
		})
	});

	// Return Proxy
	return proxy;

})();