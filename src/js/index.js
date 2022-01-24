let mockData = [{ title: "Wellcome to NoteUP", checked: false }];

const [NoteDisplay] = useRoot("note");

createPseudo(`
.note-container{
	overflow: hidden;
	width: 250px;
	height: 400px;
	background-color:#ffffff;
	border-radius: 4px;
	box-shadow: 0 0 2px 1px #dedede;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border: 1px solid #c2c2c2;
}

.note-footer{
	border-bottom: 1px solid #c4c4c4;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    height: 25px;
}

.note-btn{
	background-color: #7474ff;
	color: white;
	font-family: sans-serif;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 12px;
	padding: 7px 10px;
	border-radius: 3px;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	cursor: pointer;
	flex-grow: 1;
	text-align: center;
	border:none;
	outline:none;
}

.font-defalut{
	font-family: sans-serif;
	text-transform: uppercase;
	font-weight: bold;
}

.note-indicator{
	font-family: sans;
}

.mr-10{
	margin-right:10px;
}
.ml-10{
	margin-left:10px;
}
.mr-5{
	margin-right:5px;
}
.ml-5{
	margin-left:5px;
}
.fns-20{
	font-size: 20px;
}
.btn-group > *{
	font-family: sans-serif;
	text-transform: uppercase;
	font-weight: bold;
	display: inline-block;
	margin: 5px;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	cursor: pointer;
}

.note-list-box{
	height: calc(400px - 91px);
	width: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	border-bottom: 1px solid #c4c4c4;
}

.note-list-box::-webkit-scrollbar{
	opacity:0;
}
.note-list{
	display: flex;
	width: 100%;
	padding: 10px 10px;
	box-sizing: border-box;
	user-select: none;
	font-family: sans-serif;
	text-transform: uppercase;
	font-size: 12px;
}

.note-list-group{
	width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: rgb(247,247,247);
    background: linear-gradient(90deg, rgb(247 247 247) 0%, rgba(255,255,255,1) 100%);
    padding: 10px;
}

.note-list-line-through{
	text-decoration: line-through;
}
.hide{
	display:none;
}

.note-list-input{
	border-radius: 3px;
	max-width: 99px;
	height: 100%;
	outline: none;
	border: 1.3px solid #d6d6d6;
	flex-grow: 1;
	padding-left:9px;
	z-index: 9999;
}
`);

// header
const [Header, NoteLabel, BtnGroup, MoveBtn, NoteListBox, DeleteBtn] =
  useElement(repeat("div", 6));

MoveBtn.text("M");
DeleteBtn.text("Delete");
DeleteBtn.set("class", "hide");

BtnGroup.append(DeleteBtn, MoveBtn);
BtnGroup.set("class", "btn-group");

NoteLabel.text("NoteUp");
NoteLabel.set("class", "ml-5 font-defalut fns-20");

Header.append(NoteLabel, BtnGroup);
Header.set("class", "note-footer");

NoteDisplay.append(Header);

//middle
function NoteListGroup(ListName = "", checked = false, key) {
  const [NoteList, NoteListGroup, NoteCheckBox] = useElement([
    ...repeat("div", 2),
    "input",
  ]);

  NoteList.text(ListName);

  function checkboxControl(flag) {
    if (flag) {
      NoteList.set("class", "note-list note-list-line-through");
      NoteCheckBox.set("checked");
    } else {
      NoteList.set("class", "note-list");
    }
  }

  NoteCheckBox.set("type", "checkbox");

  checkboxControl(checked);

  const [checkboxAction] = useListener("click", NoteCheckBox);

  checkboxAction((event) => {
    if (event.target.checked) {
      mockData[key].checked = true;
      checkboxControl(true);
    } else {
      mockData[key].checked = false;
      checkboxControl(false);
    }
  });

  NoteListGroup.append(NoteCheckBox, NoteList);
  NoteListGroup.set("class", "note-list-group");

  return NoteListGroup;
}

NoteListBox.set("class", "note-list-box");
NoteDisplay.append(NoteListBox);

//footer
const [Footer, FooterIndicator, FooterHide, FooterEditBtn] = useElement(
  repeat("div", 4)
);

FooterEditBtn.text("edit");
FooterEditBtn.set("class", "note-btn mr-10 ml-5");
FooterIndicator.text(`- ${mockData.length} -`);
FooterIndicator.set("class", "note-indicator");
FooterHide.text("hide");
FooterHide.set("class", "note-btn ml-10 mr-5");

Footer.append(FooterEditBtn, FooterIndicator, FooterHide);
Footer.set("class", "note-footer");

NoteDisplay.set("class", "note-container");
NoteDisplay.append(Footer);

// Note list create
const [CreateNoteBox, NoteListInput, NoteSaveBtn, NoteCancelBtn] = useElement([
  "div",
  "input",
  "input",
  "input",
]);

NoteListInput.set("class", "note-list-input");
NoteListInput.set("type", "text");
NoteListInput.set("placeholder", "title...");

NoteSaveBtn.set("class", "note-btn ml-5");
NoteSaveBtn.set("type", "button");
NoteSaveBtn.set("value", "save");

NoteCancelBtn.set("class", "note-btn mr-5");
NoteCancelBtn.set("type", "button");
NoteCancelBtn.set("value", "<");

CreateNoteBox.append(NoteCancelBtn, NoteListInput, NoteSaveBtn);
CreateNoteBox.set("class", "note-footer hide");

NoteDisplay.append(CreateNoteBox);

// Note hide and show

const [NoteHideAndShow, ShowBtn] = useElement(["div", "input"]);

ShowBtn.set("class", "note-btn");
ShowBtn.set("type", "button");
ShowBtn.set("value", "show");

NoteHideAndShow.append(ShowBtn);
NoteHideAndShow.set("class", "note-footer hide");

NoteDisplay.append(NoteHideAndShow);
//Action

// generate list
mockData.map((data, index) => {
  NoteListBox.append(NoteListGroup(data.title, data.checked, index));
});

// editAction
const [editAction] = useListener("click", FooterEditBtn);

editAction(() => {
  Footer.set("class", "note-footer hide");
  CreateNoteBox.set("class", "note-footer");
  DeleteBtn.set("class", "");
});

const [editSaveAction] = useListener("click", NoteSaveBtn);
editSaveAction(() => {
  Footer.set("class", "note-footer");
  CreateNoteBox.set("class", "note-footer hide");
  DeleteBtn.set("class", "hide");
  NoteListBox.removeAll();

  mockData.push({ title: NoteListInput.target.value, checked: false });
  // generate list
  mockData.map((data, index) => {
    NoteListBox.append(NoteListGroup(data.title, data.checked, index));
  });

  FooterIndicator.text(`- ${mockData.length} -`);
});

const [editCancelAction] = useListener("click", NoteCancelBtn);

editCancelAction(() => {
  Footer.set("class", "note-footer");
  CreateNoteBox.set("class", "note-footer hide");
  FooterIndicator.text(`- ${mockData.length} -`);
  DeleteBtn.set("class", "hide");
  FooterIndicator.text(`- ${mockData.length} -`);
});

const [DeleteBtnAction] = useListener("click", DeleteBtn);

DeleteBtnAction(() => {
  NoteListBox.removeAll();

  mockData = mockData.filter((data) => data.checked === false);
  // generate list
  mockData.map((data, index) => {
    NoteListBox.append(NoteListGroup(data.title, data.checked, index));
  });
  FooterIndicator.text(`- ${mockData.length} -`);
});

const [NoteHideAction] = useListener("click", FooterHide);

NoteHideAction((e) => {
  e.preventDefault();
  Footer.set("class", "note-footer hide");
  NoteListBox.set("class", "note-list-box hide");
  NoteDisplay.set("style", `height:90px;`);
  NoteHideAndShow.set("class", "note-footer");
});

const [NoteShowAction] = useListener("click", ShowBtn);

NoteShowAction((e) => {
  e.preventDefault();
  Footer.set("class", "note-footer");
  NoteListBox.set("class", "note-list-box");
  NoteDisplay.set("style", "height:400px;");
  NoteHideAndShow.set("class", "hide");
});

let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;

const [NoteMoveAction] = useListener("mousedown", MoveBtn);

NoteMoveAction((e) => {
  e.preventDefault();

  startPosX = e.clientX;
  startPosY = e.clientY;

  document.addEventListener("mousemove", mouseMove);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", mouseMove);
  });
});

function mouseMove(e) {
  // calculate the new position
  newPosX = startPosX - e.clientX;
  newPosY = startPosY - e.clientY;

  // with each move we also want to update the start X and Y
  startPosX = e.clientX;
  startPosY = e.clientY;

  // set the element's new position:
  NoteDisplay.target.style.top = NoteDisplay.target.offsetTop - newPosY + "px";
  NoteDisplay.target.style.left =
    NoteDisplay.target.offsetLeft - newPosX + "px";
}
