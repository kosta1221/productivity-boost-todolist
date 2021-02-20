const allElementsInBodyExceptLoader = document.querySelectorAll("body :not(#loader)");
const adminPageWrapper = document.querySelector("#admin-page-wrapper");

let bins = [];

async function loadAdmin() {
	const loadedBins = await getAllBinsPersistent();
	console.log(loadedBins);
	console.log(loadedBins[0]);

	for (const bin of loadedBins) {
		displayBin(bin);
	}
}

loadAdmin();

function displayBin(bin) {
	const binContainer = document.createElement("div");
	binContainer.classList.add("todo-container");
	binContainer.classList.add("bin-container");
	adminPageWrapper.appendChild(binContainer);

	const todoListNumber = document.createElement("div");
	todoListNumber.classList.add("todos-number");
	binContainer.appendChild(todoListNumber);
	todoListNumber.innerText = "Number of todos " + bin["my-todo"].length;
	console.log(bin["my-todo"].toString());

	const completedTodosNumber = document.createElement("div");
	completedTodosNumber.classList.add("completed-todos-number");
	binContainer.appendChild(completedTodosNumber);
	completedTodosNumber.innerText = "Number of completed todos: " + bin["completed-todos"].length;
	console.log(bin["completed-todos"].length);

	const binId = document.createElement("div");
	binId.classList.add("bin-id");
	binContainer.appendChild(binId);
	binId.setAttribute("data-bin-id", bin["id"]);
	binId.innerText = "bin id: " + bin["id"];

	const buttonsOfBinContainerDiv = document.createElement("div");
	buttonsOfBinContainerDiv.classList.add("buttons-of-bin-container-div");
	binContainer.appendChild(buttonsOfBinContainerDiv);

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete-button");
	deleteButton.classList.add("admin-button");
	buttonsOfBinContainerDiv.appendChild(deleteButton);
	deleteButton.innerText = "Delete Bin";

	const moveToBinButton = document.createElement("button");
	moveToBinButton.classList.add("move-to-bin-button");
	buttonsOfBinContainerDiv.appendChild(moveToBinButton);
	moveToBinButton.innerText = "Go to Bin";
}

/* Event listener for move-to-bin-button */
adminPageWrapper.addEventListener("click", (event) => {
	const closestMoveToBinButton = event.target.closest(".move-to-bin-button");
	if (closestMoveToBinButton) {
		const correspondingBin = closestMoveToBinButton.parentNode.parentNode;
		const idOfCorrespondingBin = correspondingBin.querySelector(".bin-id").dataset.binId;
		console.log(idOfCorrespondingBin);
		sessionStorage.setItem("currentWantedBinId", idOfCorrespondingBin);
		window.location.href = "./index.html";
	}
});