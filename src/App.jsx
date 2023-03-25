import './index.css'

import { useState } from 'react'
import { nanoid } from 'nanoid'

import NotesList from "./components/NotesList-comp/NotesList"
import NewNoteBtn from './components/NewNoteBtn-comp/NewNoteBtn'
import Editor from './components/Editor-comp-files/Editor-comp/Editor'
import Warning from './components/Warning-comp/Warning'

export default function App() {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: "Note 1",
			title: "Title 1",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 2",
			title: "Title 2",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 3",
			title: "Title 3",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 4",
			title: "Title 4",
			date: "13/03/2023",
		},
	]);

	const [showEditor, setShowEditor] = useState(false)
	const resetEditor = () => {
		document.body.style.overflow = "auto";
		setShowEditor(false)
		setNewlyEdited(false)
		setEditingNote(false)
		setEditorNoteMain("")
		setEditorNoteTitle("")
	}

	const [newlyEdited, setNewlyEdited] = useState(false)
	const handleCloseClick = () => { // If editor has been edited after last opening, show warning if close button is clicked
		if (newlyEdited) {setShowWarning(true)} 
		else {resetEditor()}
	}
	const [showWarning, setShowWarning] = useState(false)
	const handleYesClick = () => {
			resetEditor()
			setShowWarning(false)
	}
	const handleCancelClick = () => {setShowWarning(false)}

	const [editorNoteMain, setEditorNoteMain] = useState("")
	const handleChangeMain = (event) => {
        setEditorNoteMain(event.target.value)
		setNewlyEdited(true)
    }
	let [editorNoteTitle, setEditorNoteTitle] = useState("")
	const handleChangeTitle = (event) => {
        setEditorNoteTitle(event.target.value)
		setNewlyEdited(true)
    }

	const [editingNote, setEditingNote] = useState(false)
	const [matchingNote, setMatchingNote] = useState({})
	const handleNoteClick = (id, text, title) => {
		setEditorNoteMain(text)
		setEditorNoteTitle(title)
		setShowEditor(true)
		setEditingNote(true)
		setMatchingNote(notes.find(note => note.id === id)) // Get note with matching id
		document.body.style.overflow = "hidden";
	}

	const NewNoteBtnClick = () => {
		if (showEditor && (editorNoteMain != "")) {  // If NewNoteBtn is clicked when editor is open and has text in EditorTextbox, then close editor and save.
			if (!editingNote) {
				const date = new Date();
				if (editorNoteTitle == "") {editorNoteTitle = "Untitled"}
				const newNote = {
					id: nanoid(),
					text: editorNoteMain,
					title: editorNoteTitle,
					date: date.toLocaleDateString()
				}
				notes.unshift(newNote) // Add the new note to the start of the notes array
			}
			else if (editingNote && newlyEdited) {

				notes.forEach(function(note,i) { // Add the edited note to the start of the notes array
					if(note.id === matchingNote.id){
						notes.splice(i, 1);
						notes.unshift(note);
					}
				});

				const date = new Date();
				const updatedNotes = notes.map(note => {
					if (note.id === matchingNote.id) { // Check all note elements to find a matching id
						return {...note, 
								text: editorNoteMain, 
								title: editorNoteTitle, 
								date: date.toLocaleDateString()
							   } // Change props to match
					}

					return note; // Otherwise return the object as is
				});

				setNotes(updatedNotes);
			}

			setEditorNoteMain("") 
			setEditorNoteTitle("")
			setNewlyEdited(false)
			setEditingNote(false)
		}

		setShowEditor(current => !current) // showEditor bool is changed to opposite value each click.
		showEditor ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
	}
	


	return (
		<div className="App">
			<div className="main-cont">
				<NotesList notes={notes} onNoteClick={handleNoteClick}/>

				<Editor
					visibleCheck={showEditor} 
					valueMain={editorNoteMain} 
					onChangeMain={handleChangeMain}
					valueTitle={editorNoteTitle}
					onChangeTitle={handleChangeTitle}
					onCloseClick={handleCloseClick}
				/>
				
				<Warning 
					visibleCheck={showWarning} 
					onYesClick={handleYesClick} 
					onCancelClick={handleCancelClick}
				/>

				<NewNoteBtn onClick={NewNoteBtnClick}/>
			</div>	
		</div>
	)
}

	/* TODO:
		Add toastify alert on edit and new note
		Markdown + more buttons (text colour, code blocks, font size? zoom out from text by decreasing font size)
		Folders, with colours for each
		Search (by note title, text, and/or date),
		Make notes save to local storage
		Add extra options below note: + animation for it
			Delete, Duplicate, Copy, Favourites, Pin
		Dark mode
		Custom note backgrounds/insert image
		Change import speech marks to double
	*/