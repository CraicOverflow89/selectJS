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
			return proxy;
		}
	};

	// Ready Logic
	document.addEventListener("DOMContentLoaded", (event) => {
		[...document.getElementsByClassName("selectJS")].forEach((element) => {
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
					if(!Array.isArray(data)) {
						console.log("Data has invalid format");
						return;
					}
					data.forEach((option) => {
						if(!option.hasOwnProperty(fieldValue)) {
							console.log("Data has no " + fieldValue + " property for value");
							return;
						}
						if(!option.hasOwnProperty(fieldText)) {
							console.log("Data has no " + fieldText + " property for text");
							return;
						}
						element.append(new Option(option[fieldText], option[fieldValue]));
					});
				}
				request.onerror = () => console.log("Encountered an error fetching data");
				request.send();
			});
		})
	});

	// Return Proxy
	return proxy;

})();