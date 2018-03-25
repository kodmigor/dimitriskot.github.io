var callModalBox = document.querySelector(".for-search-button");
var modalBox = document.querySelector(".modal-search");
var form = modalBox.querySelector("form");
var arrivalDate = modalBox.querySelector("[name=arrival]");
var departureDate = modalBox.querySelector("[name=departure]");

modalBox.classList.add("modal-close");

callModalBox.addEventListener("click", function (evt) {
	evt.preventDefault();
	modalBox.classList.toggle("modal-close");
})

form.addEventListener("submit", function (evt) {
	if (!arrivalDate.value || !departureDate.value) {
		evt.preventDefault();
		modalBox.classList.remove("modal-error");
		modalBox.offsetWidth = modalBox.offsetWidth;
		modalBox.classList.add("modal-error");
	}
})